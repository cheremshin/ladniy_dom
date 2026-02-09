import { gql } from '@apollo/client';

export const CATEGORIES_LIST = gql`
    query Categories {
        categories {
            items {
                id
                title
                slug
                imageUrl
                sortOrder
            }
        }
    }
`;

export const CATALOG_CATEGORY = gql`
    query CategoryBySlug($slug: String!) {
        categoryBySlug(slug: $slug) {
            title
            imageUrl
            productTypes {
                id
                slug
                plural
            }
        }
    }
`;
