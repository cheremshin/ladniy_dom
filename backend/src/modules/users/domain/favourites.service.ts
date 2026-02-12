import { ListResult } from '@/common/domain/list-result.type';
import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { wishlist } from '@/database/schema';
import { ProductsService } from '@/modules/products/domain/products.service';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, count, eq, SQL } from 'drizzle-orm';
import { UsersService } from './users.service';

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
        private readonly productsService: ProductsService,
        private readonly usersService: UsersService,
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
            const [existsFavourite] = await tx
                .select()
                .from(wishlist)
                .where(
                    and(eq(wishlist.productId, data.productId), eq(wishlist.userId, data.userId)),
                )
                .limit(1);

            if (existsFavourite) {
                await tx
                    .delete(wishlist)
                    .where(
                        and(
                            eq(wishlist.productId, data.productId),
                            eq(wishlist.userId, data.userId),
                        ),
                    );

                return existsFavourite;
            }

            await this.productsService.findOne(data.productId);
            await this.usersService.findOne(data.userId);

            const [record] = await tx
                .insert(wishlist)
                .values({
                    userId: data.userId,
                    productId: data.productId,
                })
                .returning();

            if (!record) {
                throw new InternalServerErrorException('Cannot insert record');
            }

            return record;
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
