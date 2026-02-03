import { BrandBase } from './brand.types';
import { CategoryBase } from './category.types';
import { Id, Price, Slug } from './common.types';
import { ProductImage } from './product-image.types';
import { ProductTypeBase } from './product-type.types';

export type ProductPricing = Readonly<{
    base: Price;
    discountPrice?: Price | null;
}>;

export enum ProductStatus {
    ACTIVE = 'ACTIVE',
    DISCOUNTED = 'DISCOUNTED',
    DRAFT = 'DRAFT',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export type ProductPreview = Readonly<{
    id: Id;
    slug: Slug;
    
    title: string;

    pricing: ProductPricing;
    status: ProductStatus;

    isFeatured: boolean;
    stockQuantity: number;
    
    primaryImage?: ProductImage | null;
    images?: ProductImage[] | null;
}>;

export type ProductSpecification = Array<{
    key: string;
    value: string | number | boolean;
    displayName: string;
    description?: string | null;
    unit?: string | null;
}>;

export type ProductOverview = Readonly<{
    id: Id;

    title: string;
    sku: string;

    pricing: ProductPricing;
    status: ProductStatus;
    stockQuantity: number;
    brand: BrandBase;

    images?: ProductImage[] | null;
}>;

export type ProductDetails = Readonly<{
    description?: string | null;
    specifications: ProductSpecification | null;
    warrantyMonths: number;
}>;
