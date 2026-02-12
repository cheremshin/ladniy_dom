import { gql } from '@apollo/client';

export const CATALOG_PRODUCTS = gql`
    query CatalogProducts(
        $page: Int
        $limit: Int
        $categoryId: ID
        $brandId: ID
        $productTypeId: ID
        $minPrice: Float
        $maxPrice: Float
        $search: String
        $status: ProductStatus
        $isFeatured: Boolean
    ) {
        products(
            page: $page
            limit: $limit
            categoryId: $categoryId
            brandId: $brandId
            productTypeId: $productTypeId
            minPrice: $minPrice
            maxPrice: $maxPrice
            search: $search
            status: $status
            isFeatured: $isFeatured
        ) {
            items {
                id
                title
                slug
                basePrice
                discountPrice
                status
                isFeatured
                stockQuantity
                primaryImage {
                    id
                    url
                    altText
                    sortOrder
                    isPrimary
                }
            }
            meta {
                total
                page
                limit
                totalPages
                hasNextPage
                hasPrevPage
            }
        }
    }
`;

export const PRODUCT_PAGE = gql`
    query ProductPage($slug: String!) {
        productBySlug(slug: $slug) {
            id
            title
            slug
            description
            sku
            status
            basePrice
            discountPrice
            warrantyMonths
            specifications
            stockQuantity
            isFeatured
            metaTitle
            metaDescription
            category {
                id
                title
                slug
            }
            brand {
                id
                title
                slug
                logoUrl
            }
            images {
                id
                url
                altText
                sortOrder
                isPrimary
            }
            specificationDefinitions {
                key
                displayName
                description
                unit
            }
        }
    }
`;

export const PRODUCTS_BY_IDS = gql`
    query ProductsByIds($input: [ID!]!) {
        productsByIds(ids: $input) {
            id
            title
            slug
            basePrice
            discountPrice
            status
            isFeatured
            stockQuantity
            primaryImage {
                id
                url
                altText
                sortOrder
                isPrimary
            }
        }
    }
`;
