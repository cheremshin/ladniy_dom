import {
    Args,
    ID,
    Mutation,
    ObjectType,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { Product, ProductImage, ProductStatus } from './entities/product.entity';
import { ProductImageRecord, ProductRecord, ProductsService } from '../domain/products.service';
import { ProductFilterArgs } from './dto/product-filter.args';
import { CreateProductInput, UpdateProductInput, AttachImageInput } from './dto/product.input';
import { buildPaginatedResponse } from '@/common/presentation/utils/pagination.helper';
import { Paginated } from '@/common/presentation/dto/paginated.response';
import { CategoriesService } from '@/modules/categories/domain/categories.service';
import { BrandsService } from '@/modules/brands/domain/brands.service';
import { ProductTypesService } from '@/modules/product-types/domain/product-types.service';
import { Category } from '@/modules/categories/presentation/entities/category.entity';
import { Brand } from '@/modules/brands/presentation/entities/brand.entity';
import { ProductType } from '@/modules/product-types/presentation/entities/product-type.entity';

@ObjectType()
class PaginatedProducts extends Paginated(Product) {}

@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoriesService: CategoriesService,
        private readonly brandsService: BrandsService,
        private readonly productTypesService: ProductTypesService,
    ) {}

    @Query(() => PaginatedProducts, { name: 'products' })
    async getProducts(
        @Args({ nullable: true }) filters?: ProductFilterArgs,
    ): Promise<PaginatedProducts> {
        const { page = 1, limit = 20, ...serviceFilters } = filters || {};
        const offset = (page - 1) * limit;

        const result = await this.productsService.findAll(serviceFilters, offset, limit);
        const productIds = result.items.map((item) => item.id);
        const imagesMap = await this.productsService.getImagesForProducts(productIds);

        return buildPaginatedResponse<Product>(
            {
                items: result.items.map((item) =>
                    this.mapToEntity(item, imagesMap.get(item.id) ?? []),
                ),
                total: result.total,
            },
            page,
            limit,
        );
    }

    @Query(() => Product, { name: 'product' })
    async getProduct(@Args('id', { type: () => ID }) id: string): Promise<Product> {
        const product = await this.productsService.findOne(id);
        const productImages = await this.productsService.getImages(id);
        return this.mapToEntity(product, productImages);
    }

    @Query(() => Product, { name: 'productBySlug' })
    async getProductBySlug(@Args('slug') slug: string): Promise<Product> {
        const product = await this.productsService.findBySlug(slug);
        const productImages = await this.productsService.getImages(product.id);
        return this.mapToEntity(product, productImages);
    }

    @ResolveField(() => Category)
    async category(@Parent() product: Product): Promise<Category> {
        return this.categoriesService.findOne(product.categoryId);
    }

    @ResolveField(() => Brand)
    async brand(@Parent() product: Product): Promise<Brand> {
        return this.brandsService.findOne(product.brandId);
    }

    @ResolveField(() => ProductType, { nullable: true })
    async productType(@Parent() product: Product): Promise<ProductType | null> {
        if (!product.productTypeId) return null;
        return this.productTypesService.findOne(product.productTypeId);
    }

    @ResolveField(() => [ProductImage])
    async images(@Parent() product: Product): Promise<ProductImage[]> {
        return this.productsService.getImages(product.id);
    }

    @Mutation(() => Product)
    async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
        const product = await this.productsService.create({
            ...input,
            basePrice: Number(input.basePrice),
            discountPrice: input.discountPrice ? Number(input.discountPrice) : undefined,
            costPrice: Number(input.costPrice),
        });
        return this.mapToEntity(product);
    }

    @Mutation(() => Product)
    async updateProduct(@Args('input') input: UpdateProductInput): Promise<Product> {
        const { id, ...data } = input;
        const product = await this.productsService.update(id, {
            ...data,
            basePrice: data.basePrice ? Number(data.basePrice) : undefined,
            discountPrice: data.discountPrice ? Number(data.discountPrice) : undefined,
            costPrice: data.costPrice ? Number(data.costPrice) : undefined,
        });
        return this.mapToEntity(product);
    }

    @Mutation(() => Product)
    async softDeleteProduct(@Args('id', { type: () => ID }) id: string): Promise<Product> {
        const product = await this.productsService.softDelete(id);
        return this.mapToEntity(product);
    }

    @Mutation(() => Product)
    async restoreProduct(@Args('id', { type: () => ID }) id: string): Promise<Product> {
        const product = await this.productsService.restore(id);
        return this.mapToEntity(product);
    }

    @Mutation(() => Product)
    async hardDeleteProduct(@Args('id', { type: () => ID }) id: string): Promise<Product> {
        const product = await this.productsService.hardDelete(id);
        return this.mapToEntity(product);
    }

    @Mutation(() => ProductImage)
    async attachProductImage(@Args('input') input: AttachImageInput): Promise<ProductImage> {
        return this.productsService.attachImage(input);
    }

    @Mutation(() => ProductImage)
    async detachProductImage(
        @Args('imageId', { type: () => ID }) imageId: string,
    ): Promise<ProductImage> {
        return this.productsService.detachImage(imageId);
    }

    @Mutation(() => ProductImage)
    async setProductPrimaryImage(
        @Args('imageId', { type: () => ID }) imageId: string,
    ): Promise<ProductImage> {
        return this.productsService.setPrimaryImage(imageId);
    }

    private mapToEntity(product: ProductRecord, images?: ProductImageRecord[]): Product {
        const entity: Product = {
            ...product,
            status: product.status as ProductStatus,
            basePrice: Number(product.basePrice),
            discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
            costPrice: Number(product.costPrice),
            specifications: product.specifications as Record<string, unknown> | null,
            primaryImage: null,
            images: [],
        };

        if (images && images.length > 0) {
            let primaryFound = false;
            images.forEach((image) => {
                if (image.isPrimary) {
                    if (primaryFound) {
                        console.warn('Multiple primary images found for product', entity.id);
                    }
                    primaryFound = true;
                    entity.primaryImage = image;
                } else {
                    entity.images?.push(image);
                }
            });
        }

        entity.images?.sort((a, b) => a.sortOrder - b.sortOrder);

        return entity;
    }
}
