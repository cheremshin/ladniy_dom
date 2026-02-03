import {
    check,
    foreignKey,
    index,
    pgTable,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { timestampDefaultNow } from '../utils/common-fields';
import { categories } from './categories';
import { sql } from 'drizzle-orm';

export const productTypes = pgTable(
    'product_types',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        title: varchar('title', { length: 128 }).notNull(),
        plural: varchar('plural', { length: 128 }).notNull(),
        slug: varchar('slug', { length: 128 }).notNull(),

        categoryId: uuid('category_id'),

        createdAt: timestampDefaultNow('created_at'),
        updatedAt: timestampDefaultNow('updated_at'),
        deletedAt: timestamp('deleted_at', { mode: 'date' }),
    },
    (table) => [
        foreignKey({
            columns: [table.categoryId],
            foreignColumns: [categories.id],
            name: 'product_types_category_fkey',
        }).onDelete('set null'),

        uniqueIndex('product_types_title_key').on(sql`lower(title)`),
        uniqueIndex('product_types_slug_key').on(sql`lower(slug)`),

        check('title_check', sql`(title)::text <> ''::text`),
        check('slug_check', sql`(slug)::text <> ''::text`),

        index('product_types_title_index').on(table.title),
        index('product_types_category_index').on(table.categoryId),
    ],
);
