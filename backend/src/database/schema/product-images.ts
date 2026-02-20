import {
    boolean,
    check,
    foreignKey,
    index,
    integer,
    pgTable,
    text,
    uniqueIndex,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';
import { products } from './products';
import { sql } from 'drizzle-orm';

export const productImages = pgTable(
    'product_images',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        productId: uuid('product_id').notNull(),
        url: text('url').notNull(),
        altText: varchar('alt_text', { length: 256 }),
        sortOrder: integer('sort_order').default(0).notNull(),
        isPrimary: boolean('is_primary').default(false).notNull(),

        createdAt: timestampDefaultNow('created_at'),
    },
    (table) => [
        foreignKey({
            columns: [table.productId],
            foreignColumns: [products.id],
            name: 'product_images_product_id_fkey',
        }).onDelete('cascade'),

        uniqueIndex('product_images_url_key').on(table.url),
        uniqueIndex('product_images_primary_key')
            .on(table.productId)
            .where(sql`is_primary = true`),

        check('url_check', sql`(url)::text <> ''::text`),
        check('alt_text_check', sql`alt_text IS NULL OR (alt_text)::text <> ''::text`),
        check('sort_order_check', sql`sort_order >= 0`),
        notInFutureCheck('created_at'),

        index('product_images_product_id_index').on(table.productId),
    ],
);
