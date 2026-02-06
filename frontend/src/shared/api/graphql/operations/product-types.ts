import { gql } from '@apollo/client';

export const PRODUCT_TYPES = gql`
    query ProductTypes($categoryId: ID) {
        productTypes(categoryId: $categoryId) {
            items {
                id
                slug
                title
                plural
                categoryId
            }
        }
    }
`;
