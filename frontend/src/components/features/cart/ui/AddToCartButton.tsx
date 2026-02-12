'use client';

import { Id } from '@/shared/entities/common.types';
import { FC } from 'react';
import { useCart } from '../model/useCart';
import { Button } from '@/components/base';
import { useRouter } from 'next/navigation';

type PropsT = {
    productId: Id;
    isAvailable: boolean;
};

export const AddToCartButton: FC<PropsT> = ({ productId, isAvailable }) => {
    const router = useRouter();
    const { isInCart, isPending, addToCart } = useCart(productId);

    const handleOnClick = () => {
        if (isInCart) {
            router.push('/account/cart');
            return;
        }

        addToCart();
    };

    return (
        <Button
            onClick={handleOnClick}
            disabled={!isAvailable || isPending}
            variant={isInCart ? 'secondary' : 'primary'}
        >
            {isInCart ? 'В корзине' : 'В корзину'}
        </Button>
    );
};
