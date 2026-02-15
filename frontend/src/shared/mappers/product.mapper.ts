import { CatalogProductsQuery, ProductPageQuery } from '../api/graphql/__generated__/types';
import { formatPrice } from '../entities/common.types';
import { ProductDetails, ProductOverview, ProductPreview, ProductSpecification, ProductStatus } from '../entities/product.types';
import { mapImageUrlValueToRealUrl } from './image-url.mapper';

type CatalogProductItem = CatalogProductsQuery['products']['items'][number];
type ProductPageItem = ProductPageQuery['productBySlug'];
type SpecificationDefinitions = ProductPageItem['specificationDefinitions'];

function mapRawSpecsToProductSpecification(
    specifications: Record<string, unknown> | null | undefined,
    specificationDefinitions: SpecificationDefinitions,
) {
    const preparedSpecs: ProductSpecification = [];
    const specDefMap = new Map((specificationDefinitions ?? []).map(def => [def.key, def]));

    Object.entries(specifications ?? {}).forEach(([key, value]) => {
        const isAllowedType = typeof value === 'string'
            || typeof value === 'number'
            || typeof value === 'boolean';

        if (!isAllowedType) return;

        const specDef = specDefMap.get(key);
        if (!specDef) return;

        const logicValue = typeof value === 'boolean'
            ? value ? 'Есть' : 'Нет'
            : null;

        preparedSpecs.push({
            key,
            value: logicValue ?? value.toString(),
            displayName: specDef.displayName,
            description: specDef.description,
            unit: specDef.unit,
        });
    });

    return preparedSpecs;
}

export function mapProductToProductPreview(product: CatalogProductItem): ProductPreview {
    return {
        id: product.id,
        slug: product.slug,
        title: product.title,
        pricing: {
            base: formatPrice(product.basePrice),
            discountPrice: product.discountPrice ? formatPrice(product.discountPrice) : null,
        },
        rawPricing: {
            base: product.basePrice,
            discountPrice: product.discountPrice,
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

export function mapProductToProductOverview(product: ProductPageItem): ProductOverview {
    return {
        id: product.id,
        title: product.title,
        sku: product.sku,
        pricing: {
            base: formatPrice(product.basePrice),
            discountPrice: product.discountPrice ? formatPrice(product.discountPrice) : null,
        },
        status: product.status as ProductStatus,
        stockQuantity: product.stockQuantity,
        images: product.images ? product.images.map((image) => ({
            id: image.id,
            url: mapImageUrlValueToRealUrl(image.url),
            altText: image.altText ?? null,
            sortOrder: image.sortOrder,
            isPrimary: image.isPrimary,
        })) : null,
        brand: {
            id: product.brand.id,
            slug: product.brand.slug,
            title: product.brand.title,
            logoUrl: product.brand.logoUrl ? mapImageUrlValueToRealUrl(product.brand.logoUrl) : null,
        },
    };
}

export function mapProductToProductDetails(product: ProductPageItem): ProductDetails {
    return {
        description: product.description ?? '',
        specifications: mapRawSpecsToProductSpecification(product.specifications, product.specificationDefinitions),
        warrantyMonths: product.warrantyMonths,
    };
}
