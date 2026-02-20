import { CategoriesQuery, CategoryBySlugQuery } from '../api/graphql/__generated__/types';
import { Id, Slug } from './common.types';
import { CatalogProductType } from './product-type.types';

export type CategoryListItemDTO = CategoriesQuery['categories']['items'][number];
export type CatalogCategoryDTO = CategoryBySlugQuery['categoryBySlug'];

export type CategoryBase = Readonly<{
    id: Id;
    slug: Slug;
    title: string;
    imageUrl?: string | null;
}>;

export type CategoryListItem = CategoryBase & Readonly<{
    sortOrder: number;
}>;

export type CatalogCategory = Readonly<{
    title: string;
    imageUrl?: string | null;
    productTypes: CatalogProductType[];
}>;

export type CategoryEntity = CategoryBase & Readonly<{
    parentId: Id | null;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}>;
