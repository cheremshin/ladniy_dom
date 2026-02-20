import { ListResult } from '@/common/domain/list-result.type';
import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { wishlist } from '@/database/schema';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, count, eq, SQL } from 'drizzle-orm';

export type UserFavouriteRecord = typeof wishlist.$inferSelect;

export type UserFavouritesFilters = {
    userId: string;
};

export type ToggleFavouriteData = {
    userId: string;
    productId: string;
};

@Injectable()
export class UserFavouritesService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
    ) {}

    async getUserFavourites(
        filters: UserFavouritesFilters,
    ): Promise<ListResult<UserFavouriteRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            this.db.select().from(wishlist).where(whereClause),
            this.db.select({ total: count() }).from(wishlist).where(whereClause),
        ]);

        return { items, total };
    }

    async toggleUserFavourite(data: ToggleFavouriteData): Promise<UserFavouriteRecord> {
        return this.db.transaction(async (tx) => {
            const [deleted] = await tx
                .delete(wishlist)
                .where(
                    and(eq(wishlist.userId, data.userId), eq(wishlist.productId, data.productId)),
                )
                .returning();

            if (deleted) {
                return deleted;
            }

            const [inserted] = await tx
                .insert(wishlist)
                .values({
                    userId: data.userId,
                    productId: data.productId,
                })
                .onConflictDoNothing()
                .returning();

            if (inserted) {
                return inserted;
            }

            const [existing] = await tx
                .select()
                .from(wishlist)
                .where(
                    and(eq(wishlist.userId, data.userId), eq(wishlist.productId, data.productId)),
                )
                .limit(1);

            if (!existing) {
                throw new InternalServerErrorException('Toggle failed');
            }

            return existing;
        });
    }

    private buildFilterConditions(filters: UserFavouritesFilters) {
        const conditions: SQL[] = [];

        if (filters.userId) {
            conditions.push(eq(wishlist.userId, filters.userId));
        }

        return conditions;
    }
}
