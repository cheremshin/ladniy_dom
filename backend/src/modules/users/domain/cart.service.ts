import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { cartItems } from '@/database/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';

export type UserCartRecord = typeof cartItems.$inferSelect;

export type UserCartFilters = {
    userId: string;
};

export type ChangeUserCartData = {
    userId: string;
    productId: string;
};

@Injectable()
export class UserCartService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
    ) {}

    async getUserCart(filters: UserCartFilters): Promise<UserCartRecord[]> {
        const cart = await this.db
            .select()
            .from(cartItems)
            .where(eq(cartItems.userId, filters.userId));

        return cart;
    }

    async addToCart(data: ChangeUserCartData): Promise<UserCartRecord> {
        const [record] = await this.db
            .insert(cartItems)
            .values({
                userId: data.userId,
                productId: data.productId,
                quantity: 1,
            })
            .onConflictDoUpdate({
                target: [cartItems.userId, cartItems.productId],
                set: {
                    quantity: sql`${cartItems.quantity} + 1`,
                },
            })
            .returning();

        return record;
    }

    async removeFromCart(data: ChangeUserCartData): Promise<UserCartRecord> {
        return this.db.transaction(async (tx) => {
            const [deleted] = await tx
                .delete(cartItems)
                .where(
                    and(eq(cartItems.userId, data.userId), eq(cartItems.productId, data.productId)),
                )
                .returning();

            return deleted;
        });
    }

    async decreaseCount(data: ChangeUserCartData): Promise<UserCartRecord> {
        return this.db.transaction(async (tx) => {
            const [updated] = await tx
                .update(cartItems)
                .set({
                    quantity: sql`${cartItems.quantity} - 1`,
                })
                .where(
                    and(
                        eq(cartItems.userId, data.userId),
                        eq(cartItems.productId, data.productId),
                        sql`${cartItems.quantity} > 1`,
                    ),
                )
                .returning();

            if (updated) {
                return updated;
            }

            const [deleted] = await tx
                .delete(cartItems)
                .where(
                    and(eq(cartItems.userId, data.userId), eq(cartItems.productId, data.productId)),
                )
                .returning();

            return deleted;
        });
    }
}
