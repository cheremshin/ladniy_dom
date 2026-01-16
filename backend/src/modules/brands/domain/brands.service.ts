import { ListResult } from '@/common/domain/list-result.type';
import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { brands, products } from '@/database/schema';
import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { and, SQL, count, eq, ilike, sql } from 'drizzle-orm';

export type BrandRecord = typeof brands.$inferSelect;

export type BrandFilters = {
    includeInactive?: boolean;
    search?: string;
};

export type CreateBrandData = {
    title: string;
    slug: string;
    description?: string | null;
    logoUrl?: string | null;
    country?: string | null;
    website?: string | null;
    isActive?: boolean;
};

export type UpdateBrandData = Partial<CreateBrandData>;

@Injectable()
export class BrandsService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
    ) {}

    async findAll(
        filters: BrandFilters,
        offset: number = 0,
        limit: number = 20,
    ): Promise<ListResult<BrandRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            this.db.select().from(brands).where(whereClause).limit(limit).offset(offset),
            this.db.select({ total: count() }).from(brands).where(whereClause),
        ]);

        return { items, total };
    }

    async findOne(id: string): Promise<BrandRecord> {
        const [brand] = await this.db.select().from(brands).where(eq(brands.id, id)).limit(1);

        if (!brand) {
            throw new NotFoundException(`Brand with ID "${id} not found"`);
        }

        return brand;
    }

    async findBySlug(slug: string): Promise<BrandRecord> {
        const [brand] = await this.db
            .select()
            .from(brands)
            .where(eq(brands.slug, slug.toLowerCase()))
            .limit(1);

        if (!brand) {
            throw new NotFoundException(`Brand with slug "${slug} not found"`);
        }

        return brand;
    }

    async create(data: CreateBrandData): Promise<BrandRecord> {
        return this.db.transaction(async (tx) => {
            const existing = await tx
                .select({ id: brands.id })
                .from(brands)
                .where(eq(brands.slug, data.slug.toLowerCase()))
                .limit(1);

            if (existing.length > 0) {
                throw new ConflictException(`Brand with slug "${data.slug}" already exists`);
            }

            const [created] = await tx
                .insert(brands)
                .values({
                    title: data.title,
                    slug: data.slug.toLowerCase(),
                    description: data.description ?? null,
                    logoUrl: data.logoUrl ?? null,
                    country: data.country ?? null,
                    website: data.website ?? null,
                    isActive: data.isActive ?? true,
                })
                .returning();

            return created;
        });
    }

    async update(id: string, data: UpdateBrandData): Promise<BrandRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            if (data.slug) {
                const existing = await tx
                    .select({ id: brands.id })
                    .from(brands)
                    .where(
                        and(eq(brands.slug, data.slug.toLowerCase()), sql`${brands.id} != ${id}`),
                    )
                    .limit(1);

                if (existing.length > 0) {
                    throw new ConflictException(`Brand with slug "${data.slug}" already exists`);
                }
            }

            const { slug, ...rest } = data;

            const updateData: Partial<typeof brands.$inferInsert> = {
                ...rest,
                ...(slug !== undefined && { slug: slug.toLowerCase() }),
            };

            const [updated] = await tx
                .update(brands)
                .set(updateData)
                .where(eq(brands.id, id))
                .returning();

            return updated;
        });
    }

    async softDelete(id: string): Promise<BrandRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            // Каскадное скрытие дочерних продуктов бренда
            await tx
                .update(products)
                .set({ deletedAt: sql`now()`, updatedAt: sql`now()` })
                .where(eq(products.brandId, id));

            const [updated] = await tx
                .update(brands)
                .set({ isActive: false, deletedAt: sql`now()`, updatedAt: sql`now()` })
                .where(eq(brands.id, id))
                .returning();

            return updated;
        });
    }

    async restore(id: string): Promise<BrandRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const [restored] = await tx
                .update(brands)
                .set({ isActive: true, deletedAt: null, updatedAt: sql`now()` })
                .where(eq(brands.id, id))
                .returning();

            await tx
                .update(products)
                .set({ deletedAt: null, updatedAt: sql`now()` })
                .where(eq(products.brandId, id));

            return restored;
        });
    }

    async delete(id: string): Promise<BrandRecord> {
        return this.db.transaction(async (tx) => {
            const brand = await this.findOne(id);

            const brandProducts = await tx
                .select()
                .from(products)
                .where(eq(products.brandId, id))
                .limit(1)
                .for('update');

            if (brandProducts.length > 0) {
                throw new BadRequestException('Cannot delete brand with products.');
            }

            await tx.delete(brands).where(eq(brands.id, id));

            return brand;
        });
    }

    private buildFilterConditions(filters: BrandFilters): SQL[] {
        const conditions: SQL[] = [];

        if (filters.includeInactive === false) {
            conditions.push(eq(brands.isActive, true));
        }

        if (filters.search && filters.search.trim()) {
            conditions.push(ilike(brands.title, `%${filters.search}%`));
        }

        return conditions;
    }
}
