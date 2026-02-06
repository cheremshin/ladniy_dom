'use server';

import { CatalogProductsQuery, CatalogProductsQueryVariables, ProductPageQuery, ProductPageQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/apollo-server-client';
import { CATALOG_PRODUCTS, PRODUCT_PAGE } from '@/shared/api/graphql/operations/products';

export async function getCatalogProducts(variables?: CatalogProductsQueryVariables) {
    const data = await graphqlFetch<CatalogProductsQuery, CatalogProductsQueryVariables>(
        CATALOG_PRODUCTS,
        variables ?? {},
    );

    return data?.products ?? null;
}

export async function getProductBySlug(slug: string) {
    const data = await graphqlFetch<ProductPageQuery, ProductPageQueryVariables>(
        PRODUCT_PAGE,
        { slug },
    );

    return data?.productBySlug ?? null;
}
