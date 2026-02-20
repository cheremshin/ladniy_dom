import { gql } from '@apollo/client';
import { PRODUCT_FIELDS, PRODUCT_IMAGE_FIELDS } from '../fragments';

export const CREATE_PRODUCT = gql`
    ${PRODUCT_FIELDS}
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            ...ProductFields
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    ${PRODUCT_FIELDS}
    mutation UpdateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            ...ProductFields
        }
    }
`;

export const SOFT_DELETE_PRODUCT = gql`
    ${PRODUCT_FIELDS}
    mutation SoftDeleteProduct($id: ID!) {
        softDeleteProduct(id: $id) {
            ...ProductFields
        }
    }
`;

export const RESTORE_PRODUCT = gql`
    ${PRODUCT_FIELDS}
    mutation RestoreProduct($id: ID!) {
        restoreProduct(id: $id) {
            ...ProductFields
        }
    }
`;

export const HARD_DELETE_PRODUCT = gql`
    ${PRODUCT_FIELDS}
    mutation HardDeleteProduct($id: ID!) {
        hardDeleteProduct(id: $id) {
            ...ProductFields
        }
    }
`;

export const ATTACH_PRODUCT_IMAGE = gql`
    ${PRODUCT_IMAGE_FIELDS}
    mutation AttachProductImage($input: AttachImageInput!) {
        attachProductImage(input: $input) {
            ...ProductImageFields
        }
    }
`;

export const DETACH_PRODUCT_IMAGE = gql`
    ${PRODUCT_IMAGE_FIELDS}
    mutation DetachProductImage($imageId: ID!) {
        detachProductImage(imageId: $imageId) {
            ...ProductImageFields
        }
    }
`;

export const SET_PRODUCT_PRIMARY_IMAGE = gql`
    ${PRODUCT_IMAGE_FIELDS}
    mutation SetProductPrimaryImage($imageId: ID!) {
        setProductPrimaryImage(imageId: $imageId) {
            ...ProductImageFields
        }
    }
`;
