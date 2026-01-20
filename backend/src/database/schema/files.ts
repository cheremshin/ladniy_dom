import {
    check,
    date,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';
import { sql } from 'drizzle-orm';

export const files = pgTable(
    'files',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        name: varchar('name', { length: 512 }).notNull(),
        mimeType: varchar('mime_type', { length: 256 }).notNull(),
        size: integer('size').notNull(),

        path: text('path').notNull(),

        uploadDate: date('upload_date', { mode: 'date' }).notNull().defaultNow(),

        createdAt: timestampDefaultNow('created_at'),
        updatedAt: timestampDefaultNow('updated_at'),
        deletedAt: timestamp('deleted_at', { mode: 'date' }),
    },
    (table) => [
        check('name_check', sql`(name)::text <> ''::text`),
        check('mime_type_check', sql`(mime_type)::text <> ''::text`),
        check('size_check', sql`size > 0`),
        check('path_check', sql`(path)::text <> ''::text`),
        notInFutureCheck('created_at'),
        notInFutureCheck('updated_at'),
        notInFutureCheck('deleted_at'),

        index('files_path_index').on(table.path),
        index('files_upload_date_index').on(table.uploadDate),
    ],
);
