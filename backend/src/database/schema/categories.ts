import {
    boolean,
    check,
    foreignKey,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';

export const categories = pgTable(
    'categories',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        parentId: uuid('parent_id'),

        title: varchar('title', { length: 256 }).notNull(),
        slug: varchar('slug', { length: 256 }).notNull(),

        imageUrl: text('image_url'),

        sortOrder: integer('sort_order').default(0).notNull(),
        isActive: boolean('is_active').default(true).notNull(),

        createdAt: timestampDefaultNow('created_at'),
        updatedAt: timestampDefaultNow('updated_at'),
        deletedAt: timestamp('deleted_at', { mode: 'date' }),
    },
    (table) => [
        foreignKey({
            columns: [table.parentId],
            foreignColumns: [table.id],
            name: 'categories_parent_id_fkey',
        }).onDelete('cascade'),

        uniqueIndex('categories_slug_key').on(sql`lower(slug)`),

        check('title_check', sql`(title)::text <> ''::text`),
        check('slug_check', sql`(slug)::text <> ''::text`),
        check('slug_lowercase_check', sql`(slug)::text = lower(slug)::text`),
        check('sort_order_check', sql`sort_order >= 0`),
        notInFutureCheck('created_at'),
        notInFutureCheck('updated_at'),

        index('categories_parent_id_index').on(table.parentId),
        index('categories_slug_index').on(sql`lower(slug)`),
        index('categories_is_active_index').on(table.isActive),
        index('categories_parent_active_order_index').on(
            table.parentId,
            table.isActive,
            table.sortOrder,
        ),
    ],
);
