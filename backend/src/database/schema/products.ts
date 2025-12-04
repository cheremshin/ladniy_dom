import {
    boolean,
    check,
    decimal,
    foreignKey,
    index,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { categories } from './categories';
import { brands } from './brands';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';

export const productStatusEnum = pgEnum('product_status', [
    'draft',
    'active',
    'out_of_stock',
    'discounted',
]);

export const products = pgTable(
    'products',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        title: varchar('title', { length: 512 }).notNull(),
        slug: varchar('slug', { length: 256 }).notNull(),

        categoryId: uuid('category_id').notNull(),
        brandId: uuid('brand_id').notNull(),

        description: text('description'),
        sku: varchar('sku', { length: 64 }).notNull(),
        status: productStatusEnum('status').default('draft').notNull(),

        basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
        discountPrice: decimal('discount_price', { precision: 10, scale: 2 }),
        costPrice: decimal('cost_price', { precision: 10, scale: 2 }).notNull(),
        specifications: jsonb('specifications'),
        stockQuantity: integer('stock_quantity').default(0).notNull(),

        isFeatured: boolean('is_featured').default(false).notNull(),
        warrantyMonths: integer('warranty_months').default(0).notNull(),

        metaTitle: text(),
        metaDescription: text(),

        createdAt: timestampDefaultNow('created_at'),
        updatedAt: timestampDefaultNow('updated_at'),
        deletedAt: timestamp('deleted_at', { mode: 'string' }),
    },
    (table) => [
        foreignKey({
            columns: [table.categoryId],
            foreignColumns: [categories.id],
            name: 'products_category_id_fkey',
        }).onDelete('restrict'),

        foreignKey({
            columns: [table.brandId],
            foreignColumns: [brands.id],
            name: 'products_brand_id_fkey',
        }).onDelete('restrict'),

        uniqueIndex('products_sku_key').on(table.sku),
        uniqueIndex('products_slug_key').on(sql`lower(slug)`),

        check('title_check', sql`(title)::text <> ''::text`),
        check('slug_check', sql`(slug)::text <> ''::text`),
        check('slug_lowercase_check', sql`slug = lower(slug)`),
        check('base_price_positive', sql`base_price >= 0`),
        check('cost_price_positive', sql`cost_price >= 0`),
        check('discount_price_check', sql`discount_price IS NULL OR discount_price < base_price`),
        check('stock_non_negative', sql`stock_quantity >= 0`),
        check('warranty_non_negative', sql`warranty_months >= 0`),
        notInFutureCheck('created_at'),
        notInFutureCheck('updated_at'),

        index('products_category_id_index').on(table.categoryId),
        index('products_brand_id_index').on(table.brandId),
        index('products_status_index').on(table.status),
        index('products_is_featured_index').on(table.isFeatured),
        index('products_base_price_index').on(table.basePrice),
        index('products_discount_price_index').on(table.discountPrice),
        index('products_specifications_gin_index').using('gin', table.specifications),
        index('products_active_catalog_index')
            .on(table.categoryId, table.status, table.basePrice)
            .where(sql`status = 'active' AND deleted_at IS NULL`),
        index('products_sku_index').on(table.sku),
    ],
);
