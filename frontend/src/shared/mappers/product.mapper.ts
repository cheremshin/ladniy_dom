import { CatalogProductsQuery, Product } from '../api/graphql/__generated__/types';
import { ProductDetails, ProductPreview, ProductSpecification, ProductStatus } from '../entities/product.types';
import { mapImageUrlValueToRealUrl } from './image-url.mapper';

type CatalogProductItem = CatalogProductsQuery['products']['items'][number];

export function mapProductToProductPreview(product: CatalogProductItem): ProductPreview {
    return {
        id: product.id,
        slug: product.slug,
        title: product.title,
        pricing: {
            base: {
                amount: product.basePrice,
                currency: 'RUB',
            },
            discountPrice: product.discountPrice ? {
                amount: product.discountPrice,
                currency: 'RUB',
            } : undefined,
        },
        status: product.status as ProductStatus,
        isFeatured: product.isFeatured,
        stockQuantity: product.stockQuantity,
        primaryImage: product.primaryImage ? {
            id: product.primaryImage.id,
            url: mapImageUrlValueToRealUrl(product.primaryImage.url),
            altText: product.primaryImage.altText ?? null,
            sortOrder: product.primaryImage.sortOrder,
            isPrimary: product.primaryImage.isPrimary,
        } : null,
        images: product.images ? product.images.map((image) => ({
            id: image.id,
            url: mapImageUrlValueToRealUrl(image.url),
            altText: image.altText ?? null,
            sortOrder: image.sortOrder,
            isPrimary: image.isPrimary,
        })) : [],
    };
}

export function mapProductToProductDetails(product: Product): ProductDetails {
    return {
        ...mapProductToProductPreview(product),
        productTypeId: product.productTypeId,
        categoryId: product.categoryId,
        brandId: product.brandId,
        description: product.description ?? null,
        warrantyMonths: product.warrantyMonths,
        specifications: product.specifications as ProductSpecification | null,
        meta: {
            title: product.metaTitle ?? null,
            description: product.metaDescription ?? null,
        },
        category: {
            id: product.category.id,
            slug: product.category.slug,
            title: product.category.title,
        },
        brand: {
            id: product.brand.id,
            slug: product.brand.slug,
            title: product.brand.title,
        },
        productType: product.productType ? {
            id: product.productType.id,
            slug: product.productType.slug,
            title: product.productType.title,
        } : null,
    };
}
