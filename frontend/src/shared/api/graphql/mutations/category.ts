import { gql } from '@apollo/client';
import { CATEGORY_FIELDS } from '../fragments';

export const CREATE_CATEGORY = gql`
    ${CATEGORY_FIELDS}
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            ...CategoryFields
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    ${CATEGORY_FIELDS}
    mutation UpdateCategory($input: UpdateCategoryInput!) {
        updateCategory(input: $input) {
            ...CategoryFields
        }
    }
`;

export const HARD_DELETE_CATEGORY = gql`
    ${CATEGORY_FIELDS}
    mutation HardDeleteCategory($id: ID!) {
        hardDeleteCategory(id: $id) {
            ...CategoryFields
        }
    }
`;

export const SOFT_DELETE_CATEGORY = gql`
    ${CATEGORY_FIELDS}
    mutation SoftDeleteCategory($id: ID!) {
        softDeleteCategory(id: $id) {
            ...CategoryFields
        }
    }
`;

export const RESTORE_CATEGORY = gql`
    ${CATEGORY_FIELDS}
    mutation RestoreCategory($id: ID!) {
        restoreCategory(id: $id) {
            ...CategoryFields
        }
    }
`;
