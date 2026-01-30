'use client';

import { FC } from 'react';
import Link from 'next/link';

import { FeaturedBadge } from '@/components/dummies/badges/FeaturedBadge';
import { Button } from '@/components/base/ui/Button';
import { FavouriteIcon } from '@/components/dummies/icons/FavouriteIcon';
import { ProductPreview } from '@/shared/entities/product.types';
import { getPrices } from '@/components/entities/product/model/pricing';

import './ProductCardView.styles.css';

type PropsT = Omit<ProductPreview, 'id'> & {
    productPageUrl: string;
    buyButtonLabel: string;
    onBuyButtonClick: (slug: string) => void;
    onFavouriteButtonClick: (slug: string) => void;
    isFavourite: boolean;
};

export const ProductCardView: FC<PropsT> = ({
    title,
    slug,
    pricing,
    status,
    isFeatured,
    primaryImage,
    productPageUrl,
    buyButtonLabel,
    onBuyButtonClick,
    onFavouriteButtonClick,
    isFavourite,
}) => {
    const { currentPrice, oldPrice } = getPrices(pricing);

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
                    <Link href={productPageUrl} className='product-card__title'>{title}</Link>
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
                <Button onClick={() => onBuyButtonClick(slug)}>
                    {buyButtonLabel}
                </Button>
                <Button onClick={() => onFavouriteButtonClick(slug)}>
                    <FavouriteIcon className={isFavourite ? 'favourite-icon--active' : ''} />
                </Button>
            </div>
        </div>
    );
};
