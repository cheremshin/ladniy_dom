import type { CatalogProductsQuery } from '@/shared/api/graphql/__generated__/types';

export type Product
    = CatalogProductsQuery['products']['items'][number];

export type ProductsTableInitialData = CatalogProductsQuery;
