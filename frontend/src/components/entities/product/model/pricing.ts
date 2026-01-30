import { ProductPricing } from '@/shared/entities/product.types';

export const getPrices = (pricing: ProductPricing) => {
    return {
        currentPrice: pricing.discountPrice ?? pricing.base,
        oldPrice: pricing.discountPrice ?? null,
    }
}
