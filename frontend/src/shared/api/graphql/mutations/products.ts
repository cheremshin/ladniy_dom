import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            id
            title
            slug
            status
            basePrice
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            id
            title
            basePrice
            discountPrice
            status
        }
    }
`;

export const SOFT_DELETE_PRODUCT = gql`
    mutation SoftDeleteProduct($id: ID!) {
        softDeleteProduct(id: $id) {
            id
            status
        }
    }
`;

export const RESTORE_PRODUCT = gql`
    mutation RestoreProduct($id: ID!) {
        restoreProduct(id: $id) {
            id
            status
        }
    }
`;
