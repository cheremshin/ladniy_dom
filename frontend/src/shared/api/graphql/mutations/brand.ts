import { gql } from '@apollo/client';
import { BRAND_FIELDS } from '../fragments';

export const CREATE_BRAND = gql`
    ${BRAND_FIELDS}
    mutation CreateBrand($input: CreateBrandInput!) {
        createBrand(input: $input) {
            ...BrandFields
        }
    }
`;

export const UPDATE_BRAND = gql`
    ${BRAND_FIELDS}
    mutation UpdateBrand($input: UpdateBrandInput!) {
        updateBrand(input: $input) {
            ...BrandFields
        }
    }
`;

export const HARD_DELETE_BRAND = gql`
    ${BRAND_FIELDS}
    mutation HardDeleteBrand($id: ID!) {
        hardDeleteBrand(id: $id) {
            ...BrandFields
        }
    }
`;

export const SOFT_DELETE_BRAND = gql`
    ${BRAND_FIELDS}
    mutation SoftDeleteBrand($id: ID!) {
        softDeleteBrand(id: $id) {
            ...BrandFields
        }
    }
`;

export const RESTORE_BRAND = gql`
    ${BRAND_FIELDS}
    mutation RestoreBrand($id: ID!) {
        restoreBrand(id: $id) {
            ...BrandFields
        }
    }
`;
