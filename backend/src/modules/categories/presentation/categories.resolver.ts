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
import { Category } from './entities/category.entity';
import { CategoriesService } from '../domain/categories.service';
import { CategoryFilterArgs } from './dto/category-filter.args';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/category.input';
import { buildPaginatedResponse } from '@/common/presentation/utils/pagination.helper';
import { Paginated } from '@/common/presentation/dto/paginated.response';

@ObjectType()
class PaginatedCategories extends Paginated(Category) {}

@Resolver(() => Category)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => PaginatedCategories, { name: 'categories' })
    async getCategories(
        @Args({ nullable: true }) filters?: CategoryFilterArgs,
    ): Promise<PaginatedCategories> {
        const { page = 1, limit = 20, ...serviceFilters } = filters || {};
        const offset = (page - 1) * limit;

        const result = await this.categoriesService.findAll(serviceFilters, offset, limit);
        return buildPaginatedResponse<Category>(result, page, limit);
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

    @Mutation(() => Category)
    async createCategory(@Args('input') input: CreateCategoryInput): Promise<Category> {
        return this.categoriesService.create(input);
    }

    @Mutation(() => Category)
    async updateCategory(@Args('input') input: UpdateCategoryInput): Promise<Category> {
        const { id, ...data } = input;
        return this.categoriesService.update(id, data);
    }

    @Mutation(() => Category)
    async hardDeleteCategory(@Args('id', { type: () => ID }) id: string): Promise<Category> {
        return this.categoriesService.delete(id);
    }

    @Mutation(() => Category)
    async softDeleteCategory(@Args('id', { type: () => ID }) id: string): Promise<Category> {
        return this.categoriesService.softDelete(id);
    }

    @Mutation(() => Category)
    async restoreCategory(@Args('id', { type: () => ID }) id: string): Promise<Category> {
        return this.categoriesService.restore(id);
    }
}
