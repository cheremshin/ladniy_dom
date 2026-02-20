import { ProductPricing } from '@/shared/entities/product.types';

export type PricingT = {
    currentPrice: string;
    oldPrice: string | null;
};

export const getPrices = (pricing: ProductPricing): PricingT => {
    return {
        currentPrice: pricing.discountPrice ?? pricing.base,
        oldPrice: pricing.discountPrice ? pricing.base : null,
    };
};
