import { Args, ID, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Brand } from './entities/brand.entity';
import { BrandsService } from '../domain/brands.service';
import { BrandFilterArgs } from './dto/brand-filter.args';
import { CreateBrandInput, UpdateBrandInput } from './dto/brand.input';
import { buildPaginatedResponse } from '@/common/presentation/utils/pagination.helper';
import { Paginated } from '@/common/presentation/dto/paginated.response';
import { RequireAdmin } from '@/modules/auth/decorators/require-admin.decorator';

@ObjectType()
class PaginatedBrands extends Paginated(Brand) {}

@Resolver(() => Brand)
export class BrandsResolver {
    constructor(private readonly brandsService: BrandsService) {}

    @Query(() => PaginatedBrands, { name: 'brands' })
    async getBrands(@Args({ nullable: true }) filters?: BrandFilterArgs): Promise<PaginatedBrands> {
        const { page = 1, limit = 20, ...serviceFilters } = filters || {};
        const offset = (page - 1) * limit;

        const result = await this.brandsService.findAll(serviceFilters, offset, limit);
        return buildPaginatedResponse<Brand>(result, page, limit);
    }

    @Query(() => Brand, { name: 'brand' })
    async getBrand(@Args('id', { type: () => ID }) id: string): Promise<Brand> {
        return this.brandsService.findOne(id);
    }

    @Query(() => Brand, { name: 'brandBySlug' })
    async getBrandBySlug(@Args('slug') slug: string): Promise<Brand> {
        return this.brandsService.findBySlug(slug);
    }

    @Mutation(() => Brand)
    @RequireAdmin()
    async createBrand(@Args('input') input: CreateBrandInput): Promise<Brand> {
        return this.brandsService.create(input);
    }

    @Mutation(() => Brand)
    @RequireAdmin()
    async updateBrand(@Args('input') input: UpdateBrandInput): Promise<Brand> {
        const { id, ...data } = input;
        return this.brandsService.update(id, data);
    }

    @Mutation(() => Brand)
    @RequireAdmin()
    async hardDeleteBrand(@Args('id', { type: () => ID }) id: string): Promise<Brand> {
        return this.brandsService.delete(id);
    }

    @Mutation(() => Brand)
    @RequireAdmin()
    async softDeleteBrand(@Args('id', { type: () => ID }) id: string): Promise<Brand> {
        return this.brandsService.softDelete(id);
    }

    @Mutation(() => Brand)
    @RequireAdmin()
    async restoreBrand(@Args('id', { type: () => ID }) id: string): Promise<Brand> {
        return this.brandsService.restore(id);
    }
}
