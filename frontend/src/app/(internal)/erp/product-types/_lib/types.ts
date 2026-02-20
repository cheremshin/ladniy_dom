import type { ProductTypesQuery } from '@/shared/api/graphql/__generated__/types';

export type ProductType = ProductTypesQuery['productTypes']['items'][number];

export type ProductTypesTableInitialData = ProductTypesQuery;

export type ProductTypesMeta = ProductTypesQuery['productTypes']['meta'];
