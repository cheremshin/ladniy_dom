import { CategoriesQuery, CategoryBySlugQuery, CategoryBySlugQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { CATEGORIES, CATEGORY_BY_SLUG } from '@/shared/api/graphql/queries';
import { CatalogCategoryDTO, type CategoryListItemDTO } from '@/shared/entities/category.types';

export async function getCategoriesList(): Promise<CategoryListItemDTO[]> {
    const data = await graphqlFetch<CategoriesQuery>(
        CATEGORIES,
        undefined,
        { revalidate: 3600 },
    );

    return data?.categories.items ?? [];
}

export async function getCatalogCategory(slug: string): Promise<CatalogCategoryDTO | null> {
    const data = await graphqlFetch<CategoryBySlugQuery, CategoryBySlugQueryVariables>(
        CATEGORY_BY_SLUG,
        { slug },
        { revalidate: 3600 },
    );

    return data?.categoryBySlug ?? null;
}
