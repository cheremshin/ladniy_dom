import { foreignKey, index, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';
import { users } from './users';
import { products } from './products';

export const wishlist = pgTable(
    'wishlist',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        userId: uuid('user_id').notNull(),
        productId: uuid('product_id').notNull(),
        createdAt: timestampDefaultNow('created_at'),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'wishlist_user_id_fk',
        }).onDelete('cascade'),

        foreignKey({
            columns: [table.productId],
            foreignColumns: [products.id],
            name: 'wishlist_product_id_fk',
        }).onDelete('cascade'),

        uniqueIndex('wishlist_user_product_key').on(table.userId, table.productId),

        notInFutureCheck('created_at'),

        index('wishlist_user_id_index').on(table.userId),
    ],
);
