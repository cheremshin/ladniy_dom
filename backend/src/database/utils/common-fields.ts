import { sql } from 'drizzle-orm';
import { check, timestamp } from 'drizzle-orm/pg-core';

export const timestampDefaultNow = (columnName: string, mode: 'string' | 'date' = 'string') => {
    return timestamp(columnName, { mode: mode }).defaultNow().notNull();
};

export const notInFutureCheck = (columnName: string) => {
    return check(`${columnName}_check`, sql`${sql.identifier(columnName)} <= CURRENT_TIMESTAMP`);
};
