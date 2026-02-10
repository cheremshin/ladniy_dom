import { FC, ReactNode } from 'react';
import { ProductPreview } from '@/shared/entities/product.types';
import { getPrices } from '../../model/pricing';
import { ImageFallback } from '@/components/dummies/imageFallback';
import Link from 'next/link';
import { FeaturedBadge } from '@/components/dummies/badges';
import { Card } from '@/components/base/ui/Card';

import './ProductCard.styles.css';

export type PropsT = {
    product: ProductPreview;
    productPageUrl: string;
    children?: ReactNode;
};

export const ProductCard: FC<PropsT> = ({
    product,
    productPageUrl,
    children,
}) => {
    const { currentPrice, oldPrice } = getPrices(product.pricing);

    return (
        <Card className="product-card">
            <div className="product-card__image-container">
                {product.primaryImage?.url ? (
                    <img
                        className="product-card__image"
                        src={product.primaryImage.url}
                        loading="lazy"
                        alt={product.primaryImage?.altText ?? ''}
                    />
                ) : (
                    <ImageFallback />
                )}
            </div>
            <div className="product-card__info">
                <div>
                    <Link href={productPageUrl} className="product-card__title">
                        {product.title}
                    </Link>
                    <span className="product-card__pricing-block">
                        <span className="product-card__price">{currentPrice}</span>
                        {oldPrice && (
                            <span className="product-card__old-price">{oldPrice}</span>
                        )}
                    </span>
                </div>
                <div className="product-card__badges">
                    {product.isFeatured && <FeaturedBadge />}
                    {/** TO-DO: Добавить баджи status */}
                </div>
            </div>
            <div className="product-card__buttons">
                {children}
            </div>
        </Card>
    );
};
