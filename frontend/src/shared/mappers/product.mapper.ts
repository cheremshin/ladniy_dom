import { CatalogProductsQuery, Product } from '../api/graphql/__generated__/types';
import { formatPrice } from '../entities/common.types';
import { ProductDetails, ProductPreview, ProductSpecification, ProductStatus } from '../entities/product.types';
import { mapImageUrlValueToRealUrl } from './image-url.mapper';

type CatalogProductItem = CatalogProductsQuery['products']['items'][number];

export function mapProductToProductPreview(product: CatalogProductItem): ProductPreview {
    return {
        id: product.id,
        slug: product.slug,
        title: product.title,
        pricing: {
            base: formatPrice(product.basePrice),
            discountPrice: product.discountPrice ? formatPrice(product.discountPrice) : null,
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
