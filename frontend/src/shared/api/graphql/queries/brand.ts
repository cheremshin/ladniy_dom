import { gql } from '@apollo/client';
import { BRAND_FIELDS, PAGINATION_META_FIELDS } from '../fragments';

export const BRANDS = gql`
    ${BRAND_FIELDS}
    ${PAGINATION_META_FIELDS}
    query Brands(
        $page: Int
        $limit: Int
        $includeInactive: Boolean
        $search: String
    ) {
        brands(
            page: $page
            limit: $limit
            includeInactive: $includeInactive
            search: $search
        ) {
            items {
                ...BrandFields
            }
            meta {
                ...PaginationMetaFields
            }
        }
    }
`;

export const BRAND = gql`
    ${BRAND_FIELDS}
    query Brand($id: ID!) {
        brand(id: $id) {
            ...BrandFields
        }
    }
`;

export const BRAND_BY_SLUG = gql`
    ${BRAND_FIELDS}
    query BrandBySlug($slug: String!) {
        brandBySlug(slug: $slug) {
            ...BrandFields
        }
    }
`;
