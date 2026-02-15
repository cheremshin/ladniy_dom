import { CatalogProductsQuery, CatalogProductsQueryVariables, ProductPageQuery, ProductPageQueryVariables, ProductsByIdsQuery, ProductsByIdsQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { PRODUCTS, PRODUCT_BY_SLUG, PRODUCTS_BY_IDS } from '@/shared/api/graphql/queries';

export async function getCatalogProducts(variables?: CatalogProductsQueryVariables) {
    const data = await graphqlFetch<CatalogProductsQuery, CatalogProductsQueryVariables>(
        PRODUCTS,
        variables ?? {},
    );

    return data?.products ?? null;
}

export async function getProductBySlug(slug: string) {
    const data = await graphqlFetch<ProductPageQuery, ProductPageQueryVariables>(
        PRODUCT_BY_SLUG,
        { slug },
    );

    return data?.productBySlug ?? null;
}

export async function getProductsByIds(ids: string[]) {
    if (ids.length === 0) return [];

    const data = await graphqlFetch<ProductsByIdsQuery, ProductsByIdsQueryVariables>(
        PRODUCTS_BY_IDS,
        { input: ids },
    );

    return data.productsByIds;
}
