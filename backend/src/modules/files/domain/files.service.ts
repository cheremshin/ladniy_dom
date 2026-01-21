/* eslint-disable @typescript-eslint/no-misused-promises */
import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { files } from '@/database/schema/files';
import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    PayloadTooLargeException,
} from '@nestjs/common';
import { defaultFilesConfig, FilesConfig } from './files.config';
import path from 'path';
import { access, constants, mkdir, unlink } from 'fs/promises';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline, Readable, Transform } from 'stream';
import { promisify } from 'util';
import { fileTypeFromBuffer } from 'file-type';

const pipelineAsync = promisify(pipeline);

export type FileRecord = typeof files.$inferSelect;

export type CreateFileData = {
    name: string;
    mimeType: string;
    size: number;
    path: string;
    uploadDate: Date;
};

export type FileStreamData = {
    stream: Readable;
    name: string;
    mimeType: string;
    entityType?: string;
    entityId?: string;
};

@Injectable()
export class FilesService {
    private readonly logger = new Logger(FilesService.name);
    private readonly config: FilesConfig;
    private readonly uploadsDirectory: string;
    private initPromise: Promise<void>;

    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
        @Inject('FILES_CONFIG')
        config?: FilesConfig,
    ) {
        this.config = config ?? defaultFilesConfig;
        this.uploadsDirectory = path.resolve(this.config.uploadsDirectory);
        this.initPromise = this.ensureUploadsDirectoryExists();
    }

    private async ensureUploadsDirectoryExists(): Promise<void> {
        try {
            await access(this.uploadsDirectory, constants.W_OK);
            this.logger.log(`Uploads directory exists and writable: ${this.uploadsDirectory}`);
        } catch {
            try {
                await mkdir(this.uploadsDirectory, { recursive: true });
                this.logger.log(`Uploads directory created: ${this.uploadsDirectory}`);
                await access(this.uploadsDirectory, constants.W_OK);
                this.logger.log(`Uploads directory exists and writable: ${this.uploadsDirectory}`);
            } catch {
                this.logger.error(
                    `Failed to create or access writable uploads directory: ${this.uploadsDirectory}`,
                );
                throw new InternalServerErrorException(
                    'Uploads directory is not writable or cannot be created',
                );
            }
        }
    }

    private async getDateDirectory(date: Date): Promise<string> {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const dateDir = path.join(this.uploadsDirectory, String(year), month, day);

        try {
            await access(dateDir, constants.W_OK);
        } catch {
            await mkdir(dateDir, { recursive: true });
            this.logger.log(`Created date directory: ${dateDir}`);
        }

        return dateDir;
    }

    private getRelativePath(fullPath: string): string {
        return path.relative(this.uploadsDirectory, fullPath);
    }

    private async validateMimeTypeFromBuffer(
        buffer: Buffer,
        declaredMimeType: string,
    ): Promise<string> {
        const detected = await fileTypeFromBuffer(buffer);

        if (!detected) {
            if (!this.config.allowedMimeTypes.includes(declaredMimeType)) {
                throw new BadRequestException(`Invalid file type: ${declaredMimeType}`);
            }

            return declaredMimeType;
        }

        if (!this.config.allowedMimeTypes.includes(detected.mime)) {
            throw new BadRequestException(
                `Invalid file type: detected ${detected.mime}, declared ${declaredMimeType}`,
            );
        }

        return detected.mime;
    }

    private createSizeLimitTransform(maxSize: number): Transform {
        let totalSize = 0;

        return new Transform({
            transform(chunk: Buffer, encoding, callback) {
                totalSize += chunk.length;

                if (totalSize > maxSize) {
                    callback(
                        new PayloadTooLargeException(
                            `File size exceeds the maximum allowed size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`,
                        ),
                    );
                    return;
                }

                callback(null, chunk);
            },
        });
    }

    async findOne(id: string): Promise<FileRecord> {
        const [file] = await this.db.select().from(files).where(eq(files.id, id)).limit(1);

        if (!file) {
            throw new NotFoundException(`File with ID "${id}" not found`);
        }

        return file;
    }

    async findByPath(filePath: string): Promise<FileRecord | null> {
        const [file] = await this.db.select().from(files).where(eq(files.path, filePath)).limit(1);
        return file || null;
    }

    private async create(data: CreateFileData): Promise<FileRecord> {
        const [created] = await this.db.insert(files).values(data).returning();
        this.logger.log(`Created file record: ${created.id} (${data.name})`);
        return created;
    }

    async saveFileFromStream(data: FileStreamData): Promise<FileRecord> {
        await this.initPromise;

        const uploadDate = new Date();
        const dateDir = await this.getDateDirectory(uploadDate);
        const fileExtension = path.extname(data.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(dateDir, fileName);

        const chunks: Buffer[] = [];
        let totalSize = 0;
        let mimeTypeValidated = false;
        let validatedMimeType = data.mimeType;

        const sizeLimitTransform = this.createSizeLimitTransform(this.config.maxFileSize);
        const writeStream = createWriteStream(filePath);

        const mimeValidationTransform = new Transform({
            transform: async (chunk: Buffer, encoding, callback) => {
                totalSize += chunk.length;

                if (!mimeTypeValidated) {
                    chunks.push(chunk);
                    const collectedBuffer = Buffer.concat(chunks);

                    if (collectedBuffer.length >= 5000 || totalSize === chunk.length) {
                        try {
                            validatedMimeType = await this.validateMimeTypeFromBuffer(
                                collectedBuffer,
                                data.mimeType,
                            );
                            mimeTypeValidated = true;
                            // Отправляем накопленные чанки
                            callback(null, collectedBuffer);
                            chunks.length = 0;
                        } catch (error) {
                            callback(error as Error);
                        }
                        return;
                    }
                    callback();
                    return;
                }

                callback(null, chunk);
            },
            flush(callback) {
                if (chunks.length > 0) {
                    callback(null, Buffer.concat(chunks));
                } else {
                    callback();
                }
            },
        });

        try {
            await pipelineAsync(
                data.stream,
                sizeLimitTransform,
                mimeValidationTransform,
                writeStream,
            );

            const [fileRecord] = await this.db
                .insert(files)
                .values({
                    name: data.name,
                    mimeType: validatedMimeType,
                    size: totalSize,
                    path: this.getRelativePath(filePath),
                    uploadDate,
                    entityType: data.entityType ?? null,
                    entityId: data.entityId ?? null,
                })
                .returning();

            this.logger.log(
                `File uploaded successfully: ${fileRecord.id} (${data.name}, ${(totalSize / 1024 / 1024).toFixed(2)}MB)`,
            );

            return fileRecord;
        } catch (error) {
            try {
                await unlink(filePath);
            } catch {
                // ignore
            }

            if (error instanceof BadRequestException || error instanceof PayloadTooLargeException) {
                throw error;
            }

            this.logger.error(`Failed to save file: ${error}`);
            throw new InternalServerErrorException('Failed to save file');
        }
    }

    async getFileStream(id: string): Promise<{ stream: Readable; file: FileRecord }> {
        const file = await this.findOne(id);
        const fullPath = path.join(this.uploadsDirectory, file.path);

        try {
            await access(fullPath, constants.R_OK);
            const stream = createReadStream(fullPath);
            return { stream, file };
        } catch {
            this.logger.error(`File not found on disk: ${id}`);
            throw new NotFoundException(`File "${id} not found on disk`);
        }
    }

    async getFileStreamByPath(url: string): Promise<{ stream: Readable; file: FileRecord }> {
        const file = await this.findByPath(url);

        if (!file) {
            throw new NotFoundException(`File "${url}" not found`);
        }

        const fullPath = path.join(this.uploadsDirectory, file.path);
        try {
            await access(fullPath, constants.R_OK);
            const stream = createReadStream(fullPath);
            return { stream, file };
        } catch {
            this.logger.error(`File not found on disk: ${fullPath}`);
            throw new NotFoundException(`File "${fullPath}" not found on disk`);
        }
    }

    async delete(id: string): Promise<FileRecord> {
        const file = await this.findOne(id);
        const fullPath = path.join(this.uploadsDirectory, file.path);

        try {
            await unlink(fullPath);
            this.logger.log(`Deleted file from disk: ${fullPath}`);
        } catch {
            this.logger.warn(`File not found on disk during deletion: ${fullPath}`);
        }

        await this.db.delete(files).where(eq(files.id, id));
        this.logger.log(`Deleted file record: ${id}`);
        return file;
    }

    async attachToEntity(id: string, entityType: string, entityId: string): Promise<FileRecord> {
        const [updatedFile] = await this.db
            .update(files)
            .set({ entityType, entityId })
            .where(eq(files.id, id))
            .returning();

        if (!updatedFile) {
            throw new NotFoundException(`File with ID "${id}" not found`);
        }

        return updatedFile;
    }

    async detachFromEntity(id: string): Promise<FileRecord> {
        const [updatedFile] = await this.db
            .update(files)
            .set({ entityType: null, entityId: null })
            .where(eq(files.id, id))
            .returning();

        if (!updatedFile) {
            throw new NotFoundException(`File with ID "${id}" not found`);
        }

        return updatedFile;
    }
}
