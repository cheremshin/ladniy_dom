import { gql } from '@apollo/client';
import { PRODUCT_TYPE_FIELDS } from '../fragments';

export const CREATE_PRODUCT_TYPE = gql`
    ${PRODUCT_TYPE_FIELDS}
    mutation CreateProductType($input: CreateProductTypeInput!) {
        createProductType(input: $input) {
            ...ProductTypeFields
        }
    }
`;

export const UPDATE_PRODUCT_TYPE = gql`
    ${PRODUCT_TYPE_FIELDS}
    mutation UpdateProductType($input: UpdateProductTypeInput!) {
        updateProductType(input: $input) {
            ...ProductTypeFields
        }
    }
`;

export const HARD_DELETE_PRODUCT_TYPE = gql`
    ${PRODUCT_TYPE_FIELDS}
    mutation HardDeleteProductType($id: ID!) {
        hardDeleteProductType(id: $id) {
            ...ProductTypeFields
        }
    }
`;

export const SOFT_DELETE_PRODUCT_TYPE = gql`
    ${PRODUCT_TYPE_FIELDS}
    mutation SoftDeleteProductType($id: ID!) {
        softDeleteProductType(id: $id) {
            ...ProductTypeFields
        }
    }
`;

export const RESTORE_PRODUCT_TYPE = gql`
    ${PRODUCT_TYPE_FIELDS}
    mutation RestoreProductType($id: ID!) {
        restoreProductType(id: $id) {
            ...ProductTypeFields
        }
    }
`;
