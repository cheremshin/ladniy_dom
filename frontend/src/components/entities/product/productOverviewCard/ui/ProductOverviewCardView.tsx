import { ReactNode } from 'react';
import { PricingT } from '../../model/pricing';
import { ProductStatus } from '@/shared/entities/product.types';
import { ProductImage } from '@/shared/entities/product-image.types';

import './ProductOverviewCardView.css'

type PropsT = {
    title: string;
    sku: string;
    pricing: PricingT;
    status: ProductStatus;
    brand: {
        slug: string;
        logoUrl: string;
        title: string;
    };
    images?: ProductImage[] | null;
    isAvailable: boolean;
    children?: ReactNode; // Слот для Actions
};

export async function ProductOverviewCardView({
    title,
    sku,
    pricing,
    status,
    images,
    brand,
    isAvailable,
    children,
}: PropsT) {
    const { currentPrice, oldPrice } = pricing;

    return (
        <div className='product-overview-card'>
            <div className='product-overview-card__images-container'>
            </div>
            <div className='product-overview-card__content'>
                <div className='product-overview-card__sku'>SKU {sku}</div>
                <div className='product-overview-card__title'>{title}</div>
                <div className='product-overview-card__pricing'>
                    <span className='product-overview-card__price'>{currentPrice}</span>
                    {oldPrice && (
                        <span className='product-overview-card__old-price'>{oldPrice}</span>
                    )}
                </div>
                {isAvailable && (
                    <div className='product-overview-card__availability'>
                        <img src='/icons/accept.png'  alt='Check' />
                        В наличии
                    </div>
                )}
                <div className='product-overview-card__buttons'>
                    {children}
                </div>
            </div>
        </div>
    );
};
