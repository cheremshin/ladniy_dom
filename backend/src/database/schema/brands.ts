import {
    boolean,
    check,
    index,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';

export const brands = pgTable(
    'brands',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        title: varchar('title', { length: 256 }).notNull(),
        slug: varchar('slug', { length: 256 }).notNull(),

        description: text('description'),
        logoUrl: text('logo_url'),
        country: varchar('country', { length: 64 }),
        website: varchar('website', { length: 256 }),

        isActive: boolean('is_active').default(true).notNull(),

        createdAt: timestampDefaultNow('created_at'),
        updatedAt: timestampDefaultNow('updated_at'),
        deletedAt: timestamp('deleted_at', { mode: 'date' }),
    },
    (table) => [
        uniqueIndex('brands_title_key').on(sql`lower(title)`),
        uniqueIndex('brands_slug_key').on(sql`lower(slug)`),

        check('title_check', sql`(title)::text <> ''::text`),
        check('slug_check', sql`(slug)::text <> ''::text`),
        check('slug_lowercase_check', sql`(slug)::text = lower(slug)::text`),
        notInFutureCheck('created_at'),
        notInFutureCheck('updated_at'),
        notInFutureCheck('deleted_at'),

        index('brands_title_index').on(table.title),
        index('brands_is_active_index').on(table.isActive),
    ],
);
