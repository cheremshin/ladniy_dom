import { CatalogProductsQuery, CatalogProductsQueryVariables, ProductPageQuery, ProductPageQueryVariables, ProductsByIdsQuery, ProductsByIdsQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { CATALOG_PRODUCTS, PRODUCT_PAGE, PRODUCTS_BY_IDS } from '@/shared/api/graphql/queries/products';

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

export async function getProductsByIds(ids: string[]) {
    const data = await graphqlFetch<ProductsByIdsQuery, ProductsByIdsQueryVariables>(
        PRODUCTS_BY_IDS,
        { input: ids },
    );

    return data.productsByIds;
}
