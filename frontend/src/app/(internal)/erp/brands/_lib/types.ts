import type { BrandsQuery } from '@/shared/api/graphql/__generated__/types';

export type Brand = BrandsQuery['brands']['items'][number];

export type BrandsTableInitialData = BrandsQuery;

export type BrandsMeta = BrandsQuery['brands']['meta'];
