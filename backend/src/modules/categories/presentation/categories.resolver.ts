import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Category } from './entities/category.entity';
import { CategoriesService, CategoryFilters } from '../domain/categories.service';
import { PaginatedCategories } from './dto/paginated-categories.response';
import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { CategoryFilterArgs } from './dto/category-filter.args';

@Resolver(() => Category)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => PaginatedCategories, { name: 'categories' })
    async getCategories(
        @Args() pagination: PaginationArgs,
        @Args() filters: CategoryFilterArgs,
    ): Promise<PaginatedCategories> {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;

        const serviceFilters: CategoryFilters = {
            parentId: filters.parentId,
            isActive: filters.isActive,
            search: filters.search,
            rootOnly: filters.rootOnly,
        };

        const { items, total } = await this.categoriesService.findAll(
            serviceFilters,
            offset,
            limit,
        );

        const totalPages = Math.ceil(total / limit);

        return {
            items,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    }

    @Query(() => Category, { name: 'category' })
    async getCategory(@Args('id', { type: () => ID }) id: string): Promise<Category> {
        return this.categoriesService.findOne(id);
    }

    @Query(() => Category, { name: 'categoryBySlug' })
    async getCategoryBySlug(@Args('slug') slug: string): Promise<Category> {
        return this.categoriesService.findBySlug(slug);
    }

    @ResolveField(() => Category, { nullable: true })
    async parent(@Parent() category: Category): Promise<Category | null> {
        if (!category.parentId) return null;
        return this.categoriesService.findParent(category.parentId);
    }

    @ResolveField(() => [Category])
    async children(@Parent() category: Category): Promise<Category[]> {
        return this.categoriesService.findChildren(category.id, true);
    }
}
