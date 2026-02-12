'use client';

import { Card } from '@/components/base';
import { IncreaseCountButton, DecreaseCountButton, RemoveFromCartButton } from '@/components/features/cart';
import { useCartItemCount } from '@/components/features/cart/model/cart.selectors';
import { FC } from 'react';

import './CartProductActions.styles.css';
import { FavouriteButton } from '@/components/features/favourite';

type PropsT = {
    productId: string;
    amountAvailable: number;
};

export const CartProductActions: FC<PropsT> = ({ productId, amountAvailable }) => {
    const currentInCartAmount = useCartItemCount(productId);

    return (
        <div className="cart-product-actions">
            <Card className="amount-card">
                <IncreaseCountButton productId={productId} amountAvailable={amountAvailable} />
                {currentInCartAmount}
                <DecreaseCountButton productId={productId} />
            </Card>
            <RemoveFromCartButton productId={productId} className="remove-button" />
            <FavouriteButton productId={productId} />
        </div>
    );
};
