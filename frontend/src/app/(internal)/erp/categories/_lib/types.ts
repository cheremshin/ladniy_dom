import type { CategoriesQuery } from '@/shared/api/graphql/__generated__/types';

export type Category = CategoriesQuery['categories']['items'][number];

export type CategoriesTableInitialData = CategoriesQuery;

export type CategoriesMeta = CategoriesQuery['categories']['meta'];
