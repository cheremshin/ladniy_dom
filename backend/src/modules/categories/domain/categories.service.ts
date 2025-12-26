import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database } from '@/database/database.types';
import { categories } from '@/database/schema';
import { ListResult } from '@/common/domain/list-result.type';
import { SQL, isNull, eq, ilike, and, asc, count } from 'drizzle-orm';

export type CategoryRecord = typeof categories.$inferSelect;

export interface CategoryFilters {
    parentId?: string;
    isActive?: boolean;
    search?: string;
    rootOnly?: boolean;
}

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
    ) {}

    async findAll(
        filters: CategoryFilters,
        offset: number = 0,
        limit: number = 20,
    ): Promise<ListResult<CategoryRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            this.db
                .select()
                .from(categories)
                .where(whereClause)
                .orderBy(asc(categories.sortOrder), asc(categories.title))
                .limit(limit)
                .offset(offset),

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

    async findChildren(parentId: string, isActive?: boolean): Promise<CategoryRecord[]> {
        const conditions: SQL[] = [eq(categories.parentId, parentId)];

        if (isActive !== undefined) {
            conditions.push(eq(categories.isActive, isActive));
        }

        return this.db
            .select()
            .from(categories)
            .where(and(...conditions))
            .orderBy(asc(categories.sortOrder), asc(categories.title));
    }

    async findParent(parentId: string): Promise<CategoryRecord | null> {
        const [parent] = await this.db
            .select()
            .from(categories)
            .where(eq(categories.id, parentId))
            .limit(1);

        return parent || null;
    }

    private buildFilterConditions(filters: CategoryFilters): SQL[] {
        const conditions: SQL[] = [];

        if (filters.rootOnly) {
            conditions.push(isNull(categories.parentId));
        } else if (filters.parentId !== undefined) {
            conditions.push(eq(categories.parentId, filters.parentId));
        }

        if (filters.isActive !== undefined) {
            conditions.push(eq(categories.isActive, filters.isActive));
        }

        if (filters.search) {
            conditions.push(ilike(categories.title, `%${filters.search}%`));
        }

        return conditions;
    }
}
