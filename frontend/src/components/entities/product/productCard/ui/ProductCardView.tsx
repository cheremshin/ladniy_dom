import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { FeaturedBadge } from '@/components/dummies/badges/FeaturedBadge';
import { ProductStatus } from '@/shared/entities/product.types';
import { ProductImage } from '@/shared/entities/product-image.types';
import { PricingT } from '@/components/entities/product/model/pricing';

import './ProductCardView.styles.css';

type PropsT = {
    title: string;
    pricing: PricingT;
    status: ProductStatus;
    isFeatured: boolean;
    primaryImage?: ProductImage | null;
    productPageUrl: string;
    children?: ReactNode; // Слот для Actions
}

export async function ProductCardView({
    title,
    pricing,
    isFeatured,
    primaryImage,
    productPageUrl,
    children,
}: PropsT) {
    const { currentPrice, oldPrice } = pricing;

    return (
        <div className='product-card'>
            <div className='product-card__image-container'>
                {primaryImage?.url ? (
                    <img
                        className='product-card__image'
                        src={primaryImage.url}
                        loading='lazy'
                        alt={primaryImage?.altText ?? ''}
                    />
                ) : (
                    <div className='product-card__image-placeholder'>
                        <span>No image</span>
                    </div>
                )}
            </div>
            <div className='product-card__info'>
                <div>
                    <Link href={productPageUrl} className='product-card__title'>
                        {title}
                    </Link>
                    <span className='product-card__pricing-block'>
                        <span className='product-card__price'>{currentPrice}</span>
                        {oldPrice && (
                            <span className='product-card__old-price'>{oldPrice}</span>
                        )}
                    </span>
                </div>
                <div className='product-card__badges'>
                    {isFeatured && <FeaturedBadge />}
                    {/** TO-DO: Добавить баджи status */}
                </div>
            </div>
            <div className='product-card__buttons'>
                {children}
            </div>
        </div>
    );
}
