import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProvider: Provider = {
    provide: DATABASE_CONNECTION,
    useFactory: (configService: ConfigService) => {
        const connectionString = `postgresql://${configService.get<string>('DB_USER')}:${configService.get<string>('DB_PASSWORD')}@${configService.get<string>('DB_HOST')}:${configService.get<string>('DB_PORT')}/${configService.get<string>('DB_NAME')}`;

        const client = postgres(connectionString, {
            ssl: false,
        });
        const db = drizzle(client, { schema });

        return db;
    },
    inject: [ConfigService],
};
