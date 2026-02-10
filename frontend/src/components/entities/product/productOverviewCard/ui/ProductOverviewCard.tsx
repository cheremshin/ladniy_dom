import { FC, ReactNode } from 'react';
import { ProductOverview } from '@/shared/entities/product.types';
import { getPrices } from '../../model/pricing';
import { Card } from '@/components/base/ui/Card';

import './ProductOverviewCard.css';

type PropsT = {
    product: ProductOverview;
    children?: ReactNode;
};

export const ProductOverviewCard: FC<PropsT> = ({ product, children }) => {
    const { currentPrice, oldPrice } = getPrices(product.pricing);

    return (
        <Card className="product-overview-card">
            <div className="product-overview-card__images-container">
            </div>
            <div className="product-overview-card__content">
                <div className="product-overview-card__sku">{`SKU ${product.sku}`}</div>
                <div className="product-overview-card__title">{product.title}</div>
                <div className="product-overview-card__pricing">
                    <span className="product-overview-card__price">{currentPrice}</span>
                    {oldPrice && (
                        <span className="product-overview-card__old-price">{oldPrice}</span>
                    )}
                </div>
                {product.stockQuantity > 0 && (
                    <div className="product-overview-card__availability">
                        <img src="/icons/accept.png" alt="Check" />
                        В наличии
                    </div>
                )}
                <div className="product-overview-card__buttons">
                    {children}
                </div>
            </div>
        </Card>
    );
};
