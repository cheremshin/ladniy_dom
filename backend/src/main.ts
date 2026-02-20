import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger:
            process.env.NODE_ENV === 'production'
                ? ['error', 'warn']
                : ['log', 'debug', 'error', 'warn', 'verbose'],
    });

    // Применяем graphql-upload только к GraphQL запросам
    app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.path === '/graphql') {
            return graphqlUploadExpress({
                maxFileSize: parseInt(process.env.MAX_FILE_SIZE ?? '10485760'),
                maxFiles: 10,
            })(req, res, next);
        }
        next();
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            disableErrorMessages: process.env.NODE_ENV === 'production',
        }),
    );

    app.enableCors({
        origin: ['http://localhost:3001'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((error: any) => {
    console.log(`Application stopped: ${error}`);
});
