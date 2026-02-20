'use client';

import { Id } from '@/shared/entities/common.types';
import { FC } from 'react';
import { useCart } from '../model/useCart';
import { Button } from '@/components/base';
import { useRouter } from 'next/navigation';
import { DeleteIcon } from '@/components/dummies/icons';

type PropsT = {
    productId: Id;
    className?: string;
};

export const RemoveFromCartButton: FC<PropsT> = ({ productId, className = '' }) => {
    const router = useRouter();
    const { isInCart, isPending, removeFromCart } = useCart(productId);

    const handleOnClick = () => {
        if (!isInCart) {
            router.push('/account/cart');
            return;
        }

        removeFromCart();
    };

    return (
        <Button
            onClick={handleOnClick}
            disabled={isPending}
            variant="outlined"
            className={className}
        >
            <DeleteIcon />
        </Button>
    );
};
