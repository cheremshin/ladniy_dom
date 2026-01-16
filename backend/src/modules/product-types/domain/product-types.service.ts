import { products, productTypes } from '@/database/schema';
import { DATABASE_CONNECTION } from '@/database/database.provider';
import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Database } from '@/database/database.types';
import { ListResult } from '@/common/domain/list-result.type';
import { and, count, eq, ilike, isNull, sql, SQL } from 'drizzle-orm';
import { CategoriesService } from '@/modules/categories/domain/categories.service';

export type ProductTypeRecord = typeof productTypes.$inferSelect;

export type ProductTypeFilters = {
    categoryId?: string | null;
    includeInactive?: boolean;
    search?: string;
};

export type CreateProductTypeData = {
    title: string;
    slug: string;
    categoryId?: string | null;
};

export type UpdateProductTypeData = Partial<CreateProductTypeData>;

@Injectable()
export class ProductTypesService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
        private readonly categoriesService: CategoriesService,
    ) {}

    async findAll(
        filters: ProductTypeFilters,
        offset: number = 0,
        limit: number = 20,
    ): Promise<ListResult<ProductTypeRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            this.db.select().from(productTypes).where(whereClause).limit(limit).offset(offset),
            this.db.select({ total: count() }).from(productTypes).where(whereClause),
        ]);

        return { items, total };
    }

    async findOne(id: string): Promise<ProductTypeRecord> {
        const [productType] = await this.db
            .select()
            .from(productTypes)
            .where(eq(productTypes.id, id))
            .limit(1);

        if (!productType) {
            throw new NotFoundException(`Product type with ID "${id} not found"`);
        }

        return productType;
    }

    async findBySlug(slug: string): Promise<ProductTypeRecord> {
        const [productType] = await this.db
            .select()
            .from(productTypes)
            .where(eq(productTypes.slug, slug.toLowerCase()))
            .limit(1);

        if (!productType) {
            throw new NotFoundException(`Product type with slug "${slug} not found"`);
        }

        return productType;
    }

    async create(data: CreateProductTypeData): Promise<ProductTypeRecord> {
        return this.db.transaction(async (tx) => {
            const existing = await tx
                .select({ id: productTypes.id })
                .from(productTypes)
                .where(eq(productTypes.slug, data.slug.toLowerCase()))
                .limit(1);

            if (existing.length > 0) {
                throw new ConflictException(`Product type with slug "${data.slug}" already exists`);
            }

            if (data.categoryId !== undefined && data.categoryId !== null) {
                await this.categoriesService.findOne(data.categoryId);
            }

            const [created] = await tx
                .insert(productTypes)
                .values({
                    title: data.title,
                    slug: data.slug.toLowerCase(),
                    categoryId: data.categoryId ?? null,
                })
                .returning();

            return created;
        });
    }

    async update(id: string, data: UpdateProductTypeData): Promise<ProductTypeRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            if (data.categoryId !== undefined && data.categoryId !== null) {
                await this.categoriesService.findOne(data.categoryId);
            }

            const { slug, ...rest } = data;

            const updateData: Partial<typeof productTypes.$inferInsert> = {
                ...rest,
                ...(slug !== undefined && { slug: slug.toLowerCase() }),
            };

            const [updated] = await tx
                .update(productTypes)
                .set(updateData)
                .where(eq(productTypes.id, id))
                .returning();

            return updated;
        });
    }

    async softDelete(id: string): Promise<ProductTypeRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const productsInProductType = await tx
                .select({ id: products.id })
                .from(products)
                .where(eq(products.productTypeId, id))
                .for('update');

            if (productsInProductType.length > 0) {
                throw new BadRequestException('Cannot delete product type with active products.');
            }

            const [deleted] = await tx
                .update(productTypes)
                .set({ deletedAt: sql`now()` })
                .where(eq(productTypes.id, id))
                .returning();

            return deleted;
        });
    }

    async restore(id: string): Promise<ProductTypeRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const [restored] = await tx
                .update(productTypes)
                .set({ deletedAt: null })
                .where(eq(productTypes.id, id))
                .returning();

            return restored;
        });
    }

    async hardDelete(id: string): Promise<ProductTypeRecord> {
        return this.db.transaction(async (tx) => {
            const productType = await this.findOne(id);

            const productsInProductType = await tx
                .select({ id: products.id })
                .from(products)
                .where(eq(products.productTypeId, id))
                .limit(1);

            if (productsInProductType.length > 0) {
                throw new BadRequestException('Cannot delete product type with products.');
            }

            await tx.delete(productTypes).where(eq(productTypes.id, id));

            return productType;
        });
    }

    private buildFilterConditions(filters: ProductTypeFilters): SQL[] {
        const conditions: SQL[] = [];

        if (filters.categoryId !== undefined) {
            if (filters.categoryId === null) {
                conditions.push(isNull(productTypes.categoryId));
            } else {
                conditions.push(eq(productTypes.categoryId, filters.categoryId));
            }
        }

        if (filters.search && filters.search.trim()) {
            conditions.push(ilike(productTypes.title, `%${filters.search}%`));
        }

        if (filters.includeInactive === false) {
            conditions.push(isNull(productTypes.deletedAt));
        }

        return conditions;
    }
}
