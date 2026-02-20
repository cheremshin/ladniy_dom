import { DATABASE_CONNECTION } from '@/database/database.provider';
import {
    BadRequestException,
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Database } from '@/database/database.types';
import { categories, products } from '@/database/schema';
import { ListResult } from '@/common/domain/list-result.type';
import { SQL, isNull, eq, ilike, and, asc, count, sql } from 'drizzle-orm';
import { generateSlug } from '@/common/presentation/utils/slug.util';
import { FilesService } from '@/modules/files/domain/files.service';
import {
    type ProductTypeRecord,
    ProductTypesService,
} from '@/modules/product-types/domain/product-types.service';

export type CategoryRecord = typeof categories.$inferSelect;

export type CategoryFilters = {
    parentId?: string;
    includeInactive?: boolean;
    search?: string;
    rootOnly?: boolean;
};

export type CreateCategoryData = {
    title: string;
    parentId?: string | null;
    imageUrl?: string | null;
    sortOrder?: number;
    isActive?: boolean;
};

export type UpdateCategoryData = Partial<CreateCategoryData>;

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
        @Inject(forwardRef(() => ProductTypesService))
        private readonly productTypesService: ProductTypesService,
        private readonly filesService: FilesService,
    ) {}

    async findAll(
        filters: CategoryFilters,
        offset: number = 0,
        limit?: number,
    ): Promise<ListResult<CategoryRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            (() => {
                const query = this.db
                    .select()
                    .from(categories)
                    .where(whereClause)
                    .orderBy(asc(categories.sortOrder), asc(categories.title));

                if (limit !== undefined) {
                    return query.limit(limit).offset(offset);
                }

                return query;
            })(),

            this.db.select({ total: count() }).from(categories).where(whereClause),
        ]);

        return { items, total };
    }

    async findOne(id: string): Promise<CategoryRecord> {
        const [category] = await this.db
            .select()
            .from(categories)
            .where(eq(categories.id, id))
            .limit(1);

        if (!category) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }

        return category;
    }

    async findBySlug(slug: string): Promise<CategoryRecord> {
        const [category] = await this.db
            .select()
            .from(categories)
            .where(eq(categories.slug, slug.toLowerCase()))
            .limit(1);

        if (!category) {
            throw new NotFoundException(`Category with slug "${slug}" not found`);
        }

        return category;
    }

    async findChildren(parentId: string, includeInactive?: boolean): Promise<CategoryRecord[]> {
        const conditions: SQL[] = [eq(categories.parentId, parentId)];

        if (includeInactive === false) {
            conditions.push(eq(categories.isActive, true));
        }

        return this.db
            .select()
            .from(categories)
            .where(and(...conditions))
            .orderBy(asc(categories.sortOrder), asc(categories.title));
    }

    async findProductTypes(categoryId: string): Promise<ProductTypeRecord[]> {
        return (await this.productTypesService.findAll({ categoryId })).items;
    }

    async findParent(parentId: string): Promise<CategoryRecord | null> {
        const [parent] = await this.db
            .select()
            .from(categories)
            .where(eq(categories.id, parentId))
            .limit(1);

        return parent || null;
    }

    async create(data: CreateCategoryData): Promise<CategoryRecord> {
        return this.db.transaction(async (tx) => {
            const slug = generateSlug(data.title.trim());

            const existing = await tx
                .select({ id: categories.id })
                .from(categories)
                .where(eq(categories.slug, slug))
                .limit(1);

            if (existing.length > 0) {
                throw new ConflictException(`Category with slug "${slug}" already exists`);
            }

            if (data.parentId) {
                await this.findOne(data.parentId);
            }

            const [created] = await tx
                .insert(categories)
                .values({
                    title: data.title,
                    slug: slug,
                    parentId: data.parentId ?? null,
                    imageUrl: data.imageUrl ?? null,
                    sortOrder: data.sortOrder ?? 0,
                    isActive: data.isActive ?? true,
                })
                .returning();

            return created;
        });
    }

    async update(id: string, data: UpdateCategoryData): Promise<CategoryRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);
            let slug: string | undefined;

            if (data.title) {
                slug = generateSlug(data.title.trim());
            }

            if (data.parentId) {
                if (data.parentId === id) {
                    throw new BadRequestException('Category cannot be its own parent');
                }

                await this.findOne(data.parentId);
            }

            if (data.imageUrl) {
                const file = await this.filesService.findByPath(data.imageUrl);
                if (!file) {
                    throw new BadRequestException('No such image');
                }
            }

            console.log(data);

            const { parentId, ...rest } = data;

            const updateData: Partial<typeof categories.$inferInsert> = {
                ...rest,
                ...(slug !== undefined && { slug }),
                ...(parentId !== undefined && { parentId }),
            };

            const updatePatch = Object.fromEntries(
                Object.entries(updateData).filter(([, v]) => v !== undefined),
            );

            if (Object.keys(updatePatch).length === 0) {
                return this.findOne(id);
            }

            console.log(updatePatch);

            const [updated] = await tx
                .update(categories)
                .set(updatePatch)
                .where(eq(categories.id, id))
                .returning();

            return updated;
        });
    }

    async softDelete(id: string): Promise<CategoryRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            await tx.execute(sql`
                WITH RECURSIVE category_tree AS (
                    SELECT id FROM categories WHERE id = ${id}
                    UNION
                    SELECT c.id FROM categories c
                    JOIN category_tree ct ON c.parent_id = ct.id
                )
                UPDATE categories
                SET is_active = false, deleted_at = now(), updated_at = now()
                WHERE id IN (SELECT id FROM category_tree);
            `);

            const [updated] = await tx
                .update(categories)
                .set({ isActive: false, deletedAt: sql`now()` })
                .where(eq(categories.id, id))
                .returning();

            return updated;
        });
    }

    async restore(id: string): Promise<CategoryRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            await tx.execute(sql`
                WITH RECURSIVE category_tree AS (
                    SELECT id FROM categories WHERE id = ${id}
                    UNION
                    SELECT c.id FROM categories c
                    JOIN category_tree ct ON c.parent_id = ct.id
                )
                UPDATE categories
                SET is_active = true, deleted_at = NULL
                WHERE id IN (SELECT id FROM category_tree);
            `);

            const [restored] = await tx
                .update(categories)
                .set({ isActive: true, deletedAt: null })
                .where(eq(categories.id, id))
                .returning();

            return restored;
        });
    }

    async delete(id: string): Promise<CategoryRecord> {
        return this.db.transaction(async (tx) => {
            const category = await this.findOne(id);

            const children = await tx
                .select({ id: categories.id })
                .from(categories)
                .where(eq(categories.parentId, id))
                .limit(1);

            if (children.length > 0) {
                throw new BadRequestException('Cannot delete category with children.');
            }

            const productsInCategory = await tx
                .select({ id: products.id })
                .from(products)
                .where(eq(products.categoryId, id))
                .limit(1);

            if (productsInCategory.length > 0) {
                throw new BadRequestException('Cannot delete category with products.');
            }

            await tx.delete(categories).where(eq(categories.id, id));

            return category;
        });
    }

    private buildFilterConditions(filters: CategoryFilters): SQL[] {
        const conditions: SQL[] = [];

        if (filters.rootOnly) {
            conditions.push(isNull(categories.parentId));
        } else if (filters.parentId !== undefined) {
            conditions.push(eq(categories.parentId, filters.parentId));
        }

        if (filters.includeInactive === false) {
            conditions.push(eq(categories.isActive, true));
        }

        if (filters.search && filters.search.trim()) {
            conditions.push(ilike(categories.title, `%${filters.search}%`));
        }

        return conditions;
    }
}
