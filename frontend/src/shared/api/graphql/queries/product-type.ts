import { gql } from '@apollo/client';
import { PRODUCT_TYPE_FIELDS, PAGINATION_META_FIELDS } from '../fragments';

export const PRODUCT_TYPES = gql`
    ${PRODUCT_TYPE_FIELDS}
    ${PAGINATION_META_FIELDS}
    query ProductTypes(
        $page: Int
        $limit: Int
        $categoryId: ID
        $includeInactive: Boolean
        $search: String
    ) {
        productTypes(
            page: $page
            limit: $limit
            categoryId: $categoryId
            includeInactive: $includeInactive
            search: $search
        ) {
            items {
                ...ProductTypeFields
            }
            meta {
                ...PaginationMetaFields
            }
        }
    }
`;

export const PRODUCT_TYPE = gql`
    ${PRODUCT_TYPE_FIELDS}
    query ProductType($id: ID!) {
        productType(id: $id) {
            ...ProductTypeFields
        }
    }
`;

export const PRODUCT_TYPE_BY_SLUG = gql`
    ${PRODUCT_TYPE_FIELDS}
    query ProductTypeBySlug($slug: String!) {
        productTypeBySlug(slug: $slug) {
            ...ProductTypeFields
        }
    }
`;
