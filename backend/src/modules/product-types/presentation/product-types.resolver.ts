import { Args, ID, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Paginated } from '@/common/presentation/dto/paginated.response';
import { ProductType } from './entities/product-type.entity';
import { ProductTypesService } from '../domain/product-types.service';
import { ProductTypeFilterArgs } from './dto/product-type-filter.args';
import { buildPaginatedResponse } from '@/common/presentation/utils/pagination.helper';
import { CreateProductTypeInput, UpdateProductTypeInput } from './dto/product-type.input';

@ObjectType()
export class PaginatedProductTypes extends Paginated(ProductType) {}

@Resolver(() => ProductType)
export class ProductTypesResolver {
    constructor(private readonly productTypesService: ProductTypesService) {}

    @Query(() => PaginatedProductTypes, { name: 'productTypes' })
    async getProductTypes(
        @Args({ nullable: true }) filters?: ProductTypeFilterArgs,
    ): Promise<PaginatedProductTypes> {
        const { page = 1, limit = 20, ...serviceFilters } = filters || {};
        const offset = (page - 1) * limit;

        const result = await this.productTypesService.findAll(serviceFilters, offset, limit);
        return buildPaginatedResponse<ProductType>(result, page, limit);
    }

    @Query(() => ProductType, { name: 'productType' })
    async getProductType(@Args('id', { type: () => ID }) id: string): Promise<ProductType> {
        return this.productTypesService.findOne(id);
    }

    @Query(() => ProductType, { name: 'productTypeBySlug' })
    async getProductTypeBySlug(@Args('slug') slug: string): Promise<ProductType> {
        return this.productTypesService.findBySlug(slug);
    }

    @Mutation(() => ProductType, { name: 'createProductType' })
    async createProductType(@Args('input') input: CreateProductTypeInput): Promise<ProductType> {
        return this.productTypesService.create(input);
    }

    @Mutation(() => ProductType, { name: 'updateProductType' })
    async updateProductType(@Args('input') input: UpdateProductTypeInput): Promise<ProductType> {
        const { id, ...data } = input;
        return this.productTypesService.update(id, data);
    }

    @Mutation(() => ProductType, { name: 'hardDeleteProductType' })
    async hardDeleteProductType(@Args('id', { type: () => ID }) id: string): Promise<ProductType> {
        return this.productTypesService.hardDelete(id);
    }

    @Mutation(() => ProductType, { name: 'softDeleteProductType' })
    async softDeleteProductType(@Args('id', { type: () => ID }) id: string): Promise<ProductType> {
        return this.productTypesService.softDelete(id);
    }

    @Mutation(() => ProductType, { name: 'restoreProductType' })
    async restoreProductType(@Args('id', { type: () => ID }) id: string): Promise<ProductType> {
        return this.productTypesService.restore(id);
    }
}
