import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseFilePipe,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../domain/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { File } from './entities/file.entity';
import { Response } from 'express';

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.CREATED)
    async uploadFile(
        @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
        file: MulterFile,
    ): Promise<File> {
        const stream = Readable.from(file.buffer);
        const fileRecord = await this.filesService.saveFileFromStream({
            stream,
            name: file.originalname,
            mimeType: file.mimetype,
        });

        return fileRecord;
    }

    @Get(':id')
    async downloadFile(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const { stream, file } = await this.filesService.getFileStream(id);

        const encodedFilename = encodeURIComponent(file.name).replace(/[']/g, '');

        res.setHeader('Content-Type', file.mimeType);
        res.setHeader('Content-Length', file.size.toString());
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
        );

        stream.pipe(res);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteFile(@Param('id') id: string) {
        const fileRecord = await this.filesService.delete(id);

        return {
            message: 'File deleted successfully',
            file: {
                id: fileRecord.id,
                name: fileRecord.name,
                mimeType: fileRecord.mimeType,
                size: fileRecord.size,
                path: fileRecord.path,
            },
        };
    }
}
