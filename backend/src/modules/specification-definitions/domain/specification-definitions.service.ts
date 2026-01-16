import { ListResult } from '@/common/domain/list-result.type';
import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { specificationDefinitions } from '@/database/schema';
import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { and, asc, count, eq, ilike, sql, SQL } from 'drizzle-orm';
import { ProductTypesService } from '@/modules/product-types/domain/product-types.service';

export type SpecificationDefinitionRecord = typeof specificationDefinitions.$inferSelect;

export type SpecificationDefinitionFilters = {
    productTypeId?: string;
    includeInactive?: boolean;
    search?: string;
    displayNameSearch?: string;
};

export type CreateSpecificationDefinitionData = {
    productTypeId: string;
    key: string;
    displayName: string;
    description?: string | null;
    unit?: string | null;
    isFilterable?: boolean;
};

export type UpdateSpecificationDefinitionData = Partial<CreateSpecificationDefinitionData>;

@Injectable()
export class SpecificationDefinitionsService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
        private readonly productTypesService: ProductTypesService,
    ) {}

    async findAll(
        filters: SpecificationDefinitionFilters,
        offset: number = 0,
        limit: number = 20,
    ): Promise<ListResult<SpecificationDefinitionRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            this.db
                .select()
                .from(specificationDefinitions)
                .where(whereClause)
                .orderBy(asc(specificationDefinitions.key))
                .limit(limit)
                .offset(offset),

            this.db.select({ total: count() }).from(specificationDefinitions).where(whereClause),
        ]);

        return { items, total };
    }

    async findOne(id: string): Promise<SpecificationDefinitionRecord> {
        const [specificationDefinition] = await this.db
            .select()
            .from(specificationDefinitions)
            .where(eq(specificationDefinitions.id, id))
            .limit(1);

        if (!specificationDefinition) {
            throw new NotFoundException(`Specification definition with ID "${id}" not found`);
        }

        return specificationDefinition;
    }

    async create(data: CreateSpecificationDefinitionData): Promise<SpecificationDefinitionRecord> {
        return this.db.transaction(async (tx) => {
            if (data.productTypeId) {
                await this.productTypesService.findOne(data.productTypeId);
            } else {
                throw new BadRequestException('Product type is required');
            }

            const existing = await tx
                .select({ id: specificationDefinitions.id })
                .from(specificationDefinitions)
                .where(
                    and(
                        eq(specificationDefinitions.key, data.key.toLowerCase()),
                        eq(specificationDefinitions.productTypeId, data.productTypeId ?? null),
                    ),
                )
                .limit(1);

            if (existing.length > 0) {
                throw new ConflictException(
                    `Specification definition with key "${data.key}" for product type "${data.productTypeId}" already exists`,
                );
            }

            const [created] = await tx
                .insert(specificationDefinitions)
                .values({
                    ...data,
                    key: data.key.toLowerCase(),
                })
                .returning();

            return created;
        });
    }

    async update(
        id: string,
        data: UpdateSpecificationDefinitionData,
    ): Promise<SpecificationDefinitionRecord> {
        return this.db.transaction(async (tx) => {
            const specificationDefinition = await this.findOne(id);

            if (data.productTypeId) {
                await this.productTypesService.findOne(data.productTypeId);
            }

            if (data.key) {
                const existing = await tx
                    .select({ id: specificationDefinitions.id })
                    .from(specificationDefinitions)
                    .where(
                        and(
                            eq(specificationDefinitions.key, data.key.toLowerCase()),
                            eq(
                                specificationDefinitions.productTypeId,
                                specificationDefinition.productTypeId,
                            ),
                            sql`${specificationDefinitions.id} != ${specificationDefinition.id}`,
                        ),
                    )
                    .limit(1);

                if (existing.length > 0) {
                    throw new ConflictException(
                        `Specification definition with key "${data.key}" for product type "${specificationDefinition.productTypeId}" already exists`,
                    );
                }
            }

            const { key, ...rest } = data;

            const updateData: Partial<typeof specificationDefinitions.$inferInsert> = {
                ...rest,
                ...(key !== undefined && { key: key.toLowerCase() }),
            };

            const [updated] = await tx
                .update(specificationDefinitions)
                .set(updateData)
                .where(eq(specificationDefinitions.id, id))
                .returning();

            return updated;
        });
    }

    async softDelete(id: string): Promise<SpecificationDefinitionRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const [deleted] = await tx
                .update(specificationDefinitions)
                .set({ isActive: false, updatedAt: sql`now()` })
                .where(eq(specificationDefinitions.id, id))
                .returning();

            return deleted;
        });
    }

    async restore(id: string): Promise<SpecificationDefinitionRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const [restored] = await tx
                .update(specificationDefinitions)
                .set({ isActive: true, updatedAt: sql`now()` })
                .where(eq(specificationDefinitions.id, id))
                .returning();

            return restored;
        });
    }

    async hardDelete(id: string): Promise<SpecificationDefinitionRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const [deleted] = await tx
                .delete(specificationDefinitions)
                .where(eq(specificationDefinitions.id, id))
                .returning();

            return deleted;
        });
    }

    private buildFilterConditions(filters: SpecificationDefinitionFilters): SQL[] {
        const conditions: SQL[] = [];

        if (filters.productTypeId !== undefined) {
            conditions.push(eq(specificationDefinitions.productTypeId, filters.productTypeId));
        }

        if (filters.includeInactive === false) {
            conditions.push(eq(specificationDefinitions.isActive, true));
        }

        if (filters.search && filters.search.trim()) {
            conditions.push(ilike(specificationDefinitions.key, `%${filters.search}%`));
        }

        if (filters.displayNameSearch && filters.displayNameSearch.trim()) {
            conditions.push(
                ilike(specificationDefinitions.displayName, `%${filters.displayNameSearch}%`),
            );
        }

        return conditions;
    }
}
