import { ListResult } from '@/common/domain/list-result.type';
import { generateSlug } from '@/common/presentation/utils/slug.util';
import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database, DatabaseTransaction } from '@/database/database.types';
import { productImages, products, specificationDefinitions } from '@/database/schema';
import { productStatusEnum } from '@/database/schema/products';
import { BrandsService } from '@/modules/brands/domain/brands.service';
import { CategoriesService } from '@/modules/categories/domain/categories.service';
import { FilesService } from '@/modules/files/domain/files.service';
import { ProductTypesService } from '@/modules/product-types/domain/product-types.service';
import { SpecificationDefinitionRecord } from '@/modules/specification-definitions/domain/specification-definitions.service';
import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { and, asc, count, eq, ilike, isNull, sql, SQL, inArray } from 'drizzle-orm';

export type ProductRecord = typeof products.$inferSelect;
export type ProductImageRecord = typeof productImages.$inferSelect;

export type ProductStatus = (typeof productStatusEnum.enumValues)[number];

export type ProductFilters = {
    categoryId?: string;
    brandId?: string;
    productTypeId?: string;
    status?: ProductStatus;
    isFeatured?: boolean;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    includeDeleted?: boolean;
};

export type SpecificationValue = {
    key: string;
    value: string | number | boolean;
};

export type CreateProductData = {
    title: string;
    categoryId: string;
    productTypeId: string;
    brandId: string;
    description?: string;
    sku: string;
    status: ProductStatus;
    basePrice: number;
    discountPrice?: number | null;
    costPrice: number;
    specifications?: SpecificationValue[];
    stockQuantity?: number;
    isFeatured?: boolean;
    warrantyMonths?: number;
    metaTitle?: string;
    metaDescription?: string;
};

export type UpdateProductData = Partial<CreateProductData>;

export type AttachImageData = {
    productId: string;
    url: string;
    altText?: string;
    sortOrder?: number;
    isPrimary?: boolean;
};

@Injectable()
export class ProductsService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
        private readonly categoriesService: CategoriesService,
        private readonly productTypesService: ProductTypesService,
        private readonly brandsService: BrandsService,
        private readonly filesService: FilesService,
    ) {}

    async findAll(
        filters: ProductFilters,
        offset: number = 0,
        limit: number = 20,
    ): Promise<ListResult<ProductRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            this.db
                .select()
                .from(products)
                .where(whereClause)
                .orderBy(asc(products.createdAt))
                .limit(limit)
                .offset(offset),
            this.db.select({ total: count() }).from(products).where(whereClause),
        ]);

        return { items, total };
    }

    async findOne(id: string): Promise<ProductRecord> {
        const [product] = await this.db.select().from(products).where(eq(products.id, id)).limit(1);

        if (!product) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }

        return product;
    }

    async findByIds(ids: string[]): Promise<ProductRecord[]> {
        if (ids.length === 0) {
            return [];
        }

        const productArray = await this.db.select().from(products).where(inArray(products.id, ids));
        return productArray;
    }

    async findBySlug(slug: string): Promise<ProductRecord> {
        const [product] = await this.db
            .select()
            .from(products)
            .where(eq(products.slug, slug.toLowerCase()))
            .limit(1);

        if (!product) {
            throw new NotFoundException(`Product with slug "${slug}" not found`);
        }

        return product;
    }

    async create(data: CreateProductData): Promise<ProductRecord> {
        return this.db.transaction(async (tx) => {
            // Валидация связей
            await this.categoriesService.findOne(data.categoryId);
            await this.brandsService.findOne(data.brandId);
            await this.productTypesService.findOne(data.productTypeId);

            const normalizedTitle = data.title.trim();
            const slug = generateSlug(normalizedTitle);

            // Проверка уникальности slug
            const existingSlug = await tx
                .select({ id: products.id })
                .from(products)
                .where(eq(products.slug, slug))
                .limit(1);

            if (existingSlug.length > 0) {
                throw new ConflictException(`Product with slug "${slug}" already exists`);
            }

            const normalizedSku = data.sku.trim();

            // Проверка уникальности SKU
            const existingSku = await tx
                .select({ id: products.id })
                .from(products)
                .where(eq(products.sku, normalizedSku))
                .limit(1);

            if (existingSku.length > 0) {
                throw new ConflictException(`Product with SKU "${normalizedSku}" already exists`);
            }

            // Валидация спецификаций
            let validatedSpecifications: Record<string, unknown> | null = null;
            if (data.specifications && data.productTypeId) {
                validatedSpecifications = await this.validateSpecifications(
                    data.productTypeId,
                    data.specifications,
                    tx,
                );
            }

            const [created] = await tx
                .insert(products)
                .values({
                    title: normalizedTitle,
                    slug,
                    categoryId: data.categoryId,
                    productTypeId: data.productTypeId,
                    brandId: data.brandId,
                    description: data.description ?? null,
                    sku: normalizedSku,
                    status: data.status,
                    basePrice: String(data.basePrice),
                    discountPrice:
                        data.discountPrice !== undefined && data.discountPrice !== null
                            ? String(data.discountPrice)
                            : null,
                    costPrice: String(data.costPrice),
                    specifications: validatedSpecifications,
                    stockQuantity: data.stockQuantity ?? 0,
                    isFeatured: data.isFeatured ?? false,
                    warrantyMonths: data.warrantyMonths ?? 0,
                    metaTitle: data.metaTitle ?? null,
                    metaDescription: data.metaDescription ?? null,
                })
                .returning();

            return created;
        });
    }

    async update(id: string, data: UpdateProductData): Promise<ProductRecord> {
        return this.db.transaction(async (tx) => {
            const existing = await this.findOne(id);

            if (data.categoryId) {
                await this.categoriesService.findOne(data.categoryId);
            }
            if (data.brandId) {
                await this.brandsService.findOne(data.brandId);
            }
            if (data.productTypeId) {
                await this.productTypesService.findOne(data.productTypeId);
            }

            // Проверка уникальности SKU
            if (data.sku) {
                const normalizedSku = data.sku.trim();
                const existingSku = await tx
                    .select({ id: products.id })
                    .from(products)
                    .where(and(eq(products.sku, normalizedSku), sql`${products.id} != ${id}`))
                    .limit(1);

                if (existingSku.length > 0) {
                    throw new ConflictException(
                        `Product with SKU "${normalizedSku}" already exists`,
                    );
                }
            }

            // Валидация спецификаций
            const productTypeId = data.productTypeId ?? existing.productTypeId;
            // eslint-disable-next-line prettier/prettier
            const productTypeChanged = data.productTypeId !== undefined && productTypeId !== existing.productTypeId;
            let validatedSpecifications = productTypeChanged ? null : existing.specifications;
            if (data.specifications && productTypeId) {
                validatedSpecifications = await this.validateSpecifications(
                    productTypeId,
                    data.specifications,
                    tx,
                );
            }

            const { title, specifications, basePrice, discountPrice, costPrice, ...rest } = data;
            const shouldUpdateSpecifications = specifications !== undefined || productTypeChanged;

            const updateData: Partial<typeof products.$inferInsert> = {
                ...rest,
                ...(basePrice !== undefined && { basePrice: String(basePrice) }),
                ...(discountPrice !== undefined && {
                    discountPrice: discountPrice === null ? null : String(discountPrice),
                }),
                ...(costPrice !== undefined && { costPrice: String(costPrice) }),
                ...(title !== undefined && { slug: generateSlug(title.trim()) }),
                ...(data.sku !== undefined && { sku: data.sku.trim() }),
                ...(shouldUpdateSpecifications && { specifications: validatedSpecifications }),
            };

            const updatePatch = Object.fromEntries(
                Object.entries(updateData).filter(([, v]) => v !== undefined),
            );

            if (Object.keys(updatePatch).length === 0) {
                return this.findOne(id);
            }

            const [updated] = await tx
                .update(products)
                .set(updatePatch)
                .where(eq(products.id, id))
                .returning();

            return updated;
        });
    }

    async softDelete(id: string): Promise<ProductRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const [deleted] = await tx
                .update(products)
                .set({ deletedAt: sql`now()` })
                .where(eq(products.id, id))
                .returning();

            return deleted;
        });
    }

    async restore(id: string): Promise<ProductRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            const [restored] = await tx
                .update(products)
                .set({ deletedAt: null })
                .where(eq(products.id, id))
                .returning();

            return restored;
        });
    }

    async hardDelete(id: string): Promise<ProductRecord> {
        return this.db.transaction(async (tx) => {
            const product = await this.findOne(id);
            await tx.delete(products).where(eq(products.id, id));
            return product;
        });
    }

    async getSpecificationDefinitions(
        productTypeId: string,
    ): Promise<
        Pick<
            SpecificationDefinitionRecord,
            'id' | 'key' | 'displayName' | 'description' | 'unit' | 'isFilterable'
        >[]
    > {
        return this.db
            .select({
                id: specificationDefinitions.id,
                key: specificationDefinitions.key,
                displayName: specificationDefinitions.displayName,
                description: specificationDefinitions.description,
                unit: specificationDefinitions.unit,
                isFilterable: specificationDefinitions.isFilterable,
            })
            .from(specificationDefinitions)
            .where(
                and(
                    eq(specificationDefinitions.productTypeId, productTypeId),
                    eq(specificationDefinitions.isActive, true),
                ),
            )
            .orderBy(asc(specificationDefinitions.createdAt));
    }

    async getImagesForProducts(productIds: string[]): Promise<Map<string, ProductImageRecord[]>> {
        if (productIds.length === 0) {
            return new Map();
        }

        const images = await this.db
            .select()
            .from(productImages)
            .where(inArray(productImages.productId, productIds))
            .orderBy(asc(productImages.sortOrder));

        const imageMap = new Map<string, ProductImageRecord[]>();
        images.forEach((image) => {
            if (!imageMap.has(image.productId)) {
                imageMap.set(image.productId, []);
            }

            imageMap.get(image.productId)!.push(image);
        });

        return imageMap;
    }

    async getImages(productId: string): Promise<ProductImageRecord[]> {
        return this.db
            .select()
            .from(productImages)
            .where(eq(productImages.productId, productId))
            .orderBy(asc(productImages.sortOrder));
    }

    async attachImage(data: AttachImageData): Promise<ProductImageRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(data.productId);

            const existingImage = await tx
                .select({ id: productImages.id })
                .from(productImages)
                .where(eq(productImages.url, data.url))
                .limit(1);

            if (existingImage.length > 0) {
                throw new ConflictException(`Image with URL "${data.url}" is already attached`);
            }

            if (data.isPrimary) {
                await tx
                    .update(productImages)
                    .set({ isPrimary: false })
                    .where(eq(productImages.productId, data.productId));
            }

            const [created] = await tx
                .insert(productImages)
                .values({
                    productId: data.productId,
                    url: data.url,
                    altText: data.altText ?? null,
                    sortOrder: data.sortOrder ?? 0,
                    isPrimary: data.isPrimary ?? false,
                })
                .returning();

            const file = await this.filesService.findByPath(data.url);
            if (file) {
                await this.filesService.attachToEntity(file.id, 'product', data.productId);
            }

            return created;
        });
    }

    async detachImage(imageId: string): Promise<ProductImageRecord> {
        const [image] = await this.db
            .select()
            .from(productImages)
            .where(eq(productImages.id, imageId))
            .limit(1);

        if (!image) {
            throw new NotFoundException(`Product image with ID "${imageId}" not found`);
        }

        const file = await this.filesService.findByPath(image.url);
        if (file) {
            await this.filesService.detachFromEntity(file.id);
        }

        await this.db.delete(productImages).where(eq(productImages.id, imageId));

        return image;
    }

    async setPrimaryImage(imageId: string): Promise<ProductImageRecord> {
        return this.db.transaction(async (tx) => {
            const [image] = await tx
                .select()
                .from(productImages)
                .where(eq(productImages.id, imageId))
                .limit(1);

            if (!image) {
                throw new NotFoundException(`Product image with ID "${imageId}" not found`);
            }

            await tx
                .update(productImages)
                .set({ isPrimary: false })
                .where(eq(productImages.productId, image.productId));

            const [updated] = await tx
                .update(productImages)
                .set({ isPrimary: true })
                .where(eq(productImages.id, imageId))
                .returning();

            return updated;
        });
    }

    private async validateSpecifications(
        productTypeId: string,
        specs: SpecificationValue[],
        tx: DatabaseTransaction,
    ): Promise<Record<string, unknown>> {
        const definitions = await tx
            .select()
            .from(specificationDefinitions)
            .where(
                and(
                    eq(specificationDefinitions.productTypeId, productTypeId),
                    eq(specificationDefinitions.isActive, true),
                ),
            );

        const definitionsMap = new Map(definitions.map((d) => [d.key, d]));
        const result: Record<string, unknown> = {};

        for (const spec of specs) {
            const definition = definitionsMap.get(spec.key);

            if (!definition) {
                throw new BadRequestException(
                    `Unknown specification key "${spec.key}" for product type "${productTypeId}"`,
                );
            }

            result[definition.key] = spec.value;
        }

        return result;
    }

    private buildFilterConditions(filters: ProductFilters): SQL[] {
        const conditions: SQL[] = [];

        if (!filters.includeDeleted) {
            conditions.push(isNull(products.deletedAt));
        }

        if (filters.categoryId) {
            conditions.push(eq(products.categoryId, filters.categoryId));
        }

        if (filters.brandId) {
            conditions.push(eq(products.brandId, filters.brandId));
        }

        if (filters.productTypeId) {
            conditions.push(eq(products.productTypeId, filters.productTypeId));
        }

        if (filters.status) {
            conditions.push(eq(products.status, filters.status));
        }

        if (filters.isFeatured !== undefined) {
            conditions.push(eq(products.isFeatured, filters.isFeatured));
        }

        if (filters.search) {
            conditions.push(ilike(products.title, `%${filters.search}%`));
        }

        if (filters.minPrice !== undefined) {
            conditions.push(
                sql`COALESCE(${products.discountPrice}, ${products.basePrice}) >= ${filters.minPrice}`,
            );
        }

        if (filters.maxPrice !== undefined) {
            conditions.push(
                sql`COALESCE(${products.discountPrice}, ${products.basePrice}) <= ${filters.maxPrice}`,
            );
        }

        return conditions;
    }
}
