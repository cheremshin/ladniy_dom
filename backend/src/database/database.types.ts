import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

export type Database = PostgresJsDatabase<typeof schema>;

export type DatabaseTransaction = Parameters<Parameters<Database['transaction']>[0]>[0];
