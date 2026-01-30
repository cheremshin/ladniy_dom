import { BrandBase } from './brand.types';
import { CategoryBase } from './category.types';
import { Id, Money, Slug } from './common.types';
import { ProductImage } from './product-image.types';
import { ProductTypeBase } from './product-type.types';

export type ProductPricing = Readonly<{
    base: Money;
    discountPrice?: Money | null;
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

export type ProductSpecification = Readonly<Record<string, unknown>>;

export type ProductDetails = Readonly<
    ProductPreview & {
        productTypeId?: Id | null;
        brandId: Id;
        categoryId: Id;
        
        description?: string | null;

        warrantyMonths: number;
        specifications?: ProductSpecification | null;

        meta?: {
            title?: string | null;
            description?: string | null;
        };

        category: CategoryBase;
        brand: BrandBase;
        productType?: ProductTypeBase | null;
    }
>;
