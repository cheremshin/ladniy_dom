import { gql } from '@apollo/client';
import { CATEGORY_FIELDS, PAGINATION_META_FIELDS, PRODUCT_TYPE_FIELDS } from '../fragments';

export const CATEGORIES = gql`
    ${CATEGORY_FIELDS}
    ${PAGINATION_META_FIELDS}
    query Categories(
        $page: Int
        $limit: Int
        $parentId: ID
        $includeInactive: Boolean
        $search: String
        $rootOnly: Boolean
    ) {
        categories(
            page: $page
            limit: $limit
            parentId: $parentId
            includeInactive: $includeInactive
            search: $search
            rootOnly: $rootOnly
        ) {
            items {
                ...CategoryFields
                parent { id title }
            }
            meta {
                ...PaginationMetaFields
            }
        }
    }
`;

export const CATEGORY = gql`
    ${CATEGORY_FIELDS}
    query Category($id: ID!) {
        category(id: $id) {
            ...CategoryFields
        }
    }
`;

export const CATEGORY_BY_SLUG = gql`
    ${CATEGORY_FIELDS}
    ${PRODUCT_TYPE_FIELDS}
    query CategoryBySlug($slug: String!) {
        categoryBySlug(slug: $slug) {
            ...CategoryFields
            productTypes {
                ...ProductTypeFields
            }
        }
    }
`;
