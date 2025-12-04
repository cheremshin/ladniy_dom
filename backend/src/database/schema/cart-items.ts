import { check, foreignKey, index, integer, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';
import { users } from './users';
import { products } from './products';
import { sql } from 'drizzle-orm';

export const cartItems = pgTable(
    'cart_items',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        userId: uuid('user_id').notNull(),
        productId: uuid('product_id').notNull(),
        quantity: integer('quantity').default(1).notNull(),
        createdAt: timestampDefaultNow('created_at'),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'cart_items_user_id_fk',
        }).onDelete('cascade'),

        foreignKey({
            columns: [table.productId],
            foreignColumns: [products.id],
            name: 'cart_items_product_id_fk',
        }).onDelete('cascade'),

        uniqueIndex('cart_items_user_product_key').on(table.userId, table.productId),

        check('quantity_check', sql`quantity >= 1`),
        notInFutureCheck('created_at'),

        index('cart_items_user_id_index').on(table.userId),
    ],
);
