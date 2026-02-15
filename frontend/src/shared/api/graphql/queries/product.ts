import { gql } from '@apollo/client';
import {
    PRODUCT_FIELDS,
    PAGINATION_META_FIELDS,
    PRODUCT_SPECIFICATION_DEFINITION_FIELDS,
    BRAND_FIELDS,
    CATEGORY_FIELDS,
    PRODUCT_TYPE_FIELDS,
} from '../fragments';

export const PRODUCTS = gql`
    ${PRODUCT_FIELDS}
    ${PAGINATION_META_FIELDS}
    query CatalogProducts(
        $page: Int
        $limit: Int
        $categoryId: ID
        $brandId: ID
        $productTypeId: ID
        $status: ProductStatus
        $isFeatured: Boolean
        $search: String
        $minPrice: Float
        $maxPrice: Float
        $includeDeleted: Boolean
    ) {
        products(
            page: $page
            limit: $limit
            categoryId: $categoryId
            brandId: $brandId
            productTypeId: $productTypeId
            status: $status
            isFeatured: $isFeatured
            search: $search
            minPrice: $minPrice
            maxPrice: $maxPrice
            includeDeleted: $includeDeleted
        ) {
            items {
                ...ProductFields
            }
            meta {
                ...PaginationMetaFields
            }
        }
    }
`;

export const PRODUCT = gql`
    ${PRODUCT_FIELDS}
    ${PRODUCT_SPECIFICATION_DEFINITION_FIELDS}
    ${CATEGORY_FIELDS}
    ${BRAND_FIELDS}
    ${PRODUCT_TYPE_FIELDS}
    query Product($id: ID!) {
        product(id: $id) {
            ...ProductFields
            category {
                ...CategoryFields
            }
            brand {
                ...BrandFields
            }
            productType {
                ...ProductTypeFields
            }
            specificationDefinitions {
                ...ProductSpecificationDefinitionFields
            }
        }
    }
`;

export const PRODUCT_BY_SLUG = gql`
    ${PRODUCT_FIELDS}
    ${PRODUCT_SPECIFICATION_DEFINITION_FIELDS}
    ${CATEGORY_FIELDS}
    ${BRAND_FIELDS}
    ${PRODUCT_TYPE_FIELDS}
    query ProductPage($slug: String!) {
        productBySlug(slug: $slug) {
            ...ProductFields
            category {
                ...CategoryFields
            }
            brand {
                ...BrandFields
            }
            productType {
                ...ProductTypeFields
            }
            specificationDefinitions {
                ...ProductSpecificationDefinitionFields
            }
        }
    }
`;

export const PRODUCTS_BY_IDS = gql`
    ${PRODUCT_FIELDS}
    query ProductsByIds($input: [ID!]!) {
        productsByIds(ids: $input) {
            ...ProductFields
        }
    }
`;
