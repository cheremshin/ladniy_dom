'use client';

import { FC } from 'react';
import { Id } from '@/shared/entities/common.types';
import { useAddToCart } from '../model/useAddToCart';
import { Button } from '@/components/base';

type PropsT = {
    productId: Id;
    isAvailable: boolean;
};

export const AddToCartButton: FC<PropsT> = ({ productId, isAvailable }) => {
    const { isInCart, isPending, handleAddToCart } = useAddToCart();

    const buttonText = isInCart ? 'В корзине' : 'В корзину';
    const buttonDisabled = !isAvailable || isPending;
    const buttonVariant = isInCart ? 'secondary' : 'primary';

    return (
        <Button
            onClick={() => handleAddToCart(productId)}
            disabled={buttonDisabled}
            variant={buttonVariant}
        >
            {buttonText}
        </Button>
    );
};
