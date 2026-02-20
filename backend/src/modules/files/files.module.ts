import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { FilesController } from './presentation/files.controller';
import { FilesService } from './domain/files.service';
import { defaultFilesConfig } from './domain/files.config';

@Module({
    imports: [DatabaseModule],
    controllers: [FilesController],
    providers: [
        FilesService,
        {
            provide: 'FILES_CONFIG',
            useValue: defaultFilesConfig,
        },
    ],
    exports: [FilesService],
})
export class FilesModule {}
