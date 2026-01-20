export interface FilesConfig {
    uploadsDirectory: string;
    baseUrl: string;
    maxFileSize: number;
    allowedMimeTypes: string[];
}

export const defaultFilesConfig: FilesConfig = {
    uploadsDirectory: process.env.UPLOADS_DIR || './uploads',
    baseUrl: process.env.FILES_BASE_URL || '/api/files',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE ?? '10485760'), // 10MB
    allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};
