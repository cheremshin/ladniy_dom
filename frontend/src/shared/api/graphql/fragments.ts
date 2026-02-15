import { gql } from '@apollo/client';

/** Фрагменты полей сущностей для использования в queries и mutations */
export const BRAND_FIELDS = gql`
    fragment BrandFields on Brand {
        id
        title
        slug
        description
        logoUrl
        country
        website
        isActive
    }
`;

export const CATEGORY_FIELDS = gql`
    fragment CategoryFields on Category {
        id
        parentId
        title
        slug
        imageUrl
        sortOrder
        isActive
        createdAt
        updatedAt
    }
`;

export const PRODUCT_IMAGE_FIELDS = gql`
    fragment ProductImageFields on ProductImage {
        id
        url
        altText
        sortOrder
        isPrimary
        createdAt
    }
`;

export const PRODUCT_FIELDS = gql`
    fragment ProductFields on Product {
        id
        title
        slug
        categoryId
        productTypeId
        brandId
        description
        sku
        status
        basePrice
        discountPrice
        costPrice
        specifications
        stockQuantity
        isFeatured
        warrantyMonths
        metaTitle
        metaDescription
        primaryImage {
            ...ProductImageFields
        }
        images {
            ...ProductImageFields
        }
    }
    ${PRODUCT_IMAGE_FIELDS}
`;

export const PRODUCT_TYPE_FIELDS = gql`
    fragment ProductTypeFields on ProductType {
        id
        title
        plural
        slug
        categoryId
    }
`;

export const SPECIFICATION_DEFINITION_FIELDS = gql`
    fragment SpecificationDefinitionFields on SpecificationDefinition {
        id
        productTypeId
        key
        displayName
        description
        unit
        isFilterable
        isActive
    }
`;

export const PRODUCT_SPECIFICATION_DEFINITION_FIELDS = gql`
    fragment ProductSpecificationDefinitionFields on ProductSpecificationDefinition {
        id
        key
        displayName
        description
        unit
        isFilterable
    }
`;

export const USER_FIELDS = gql`
    fragment UserFields on User {
        id
        email
        firstName
        lastName
        nickname
        phone
        isActive
        role
    }
`;

export const USER_FAVOURITE_FIELDS = gql`
    fragment UserFavouriteFields on UserFavourite {
        id
        userId
        productId
    }
`;

export const USER_CART_ITEM_FIELDS = gql`
    fragment UserCartItemFields on UserCartItem {
        id
        userId
        productId
        quantity
    }
`;

export const PAGINATION_META_FIELDS = gql`
    fragment PaginationMetaFields on PaginationMeta {
        total
        page
        limit
        totalPages
        hasNextPage
        hasPrevPage
    }
`;
