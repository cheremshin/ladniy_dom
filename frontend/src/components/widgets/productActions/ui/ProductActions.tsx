'use client';

import { AddToCartButton } from '@/components/features/addToCart';
import { FavouriteButton } from '@/components/features/favourite';
import { Id } from '@/shared/entities/common.types';
import { FC } from 'react';

type PropsT = {
    productId: Id;
    isAvailable: boolean;
};

export const ProductActions: FC<PropsT> = ({ productId, isAvailable }) => {
    return (
        <>
            <AddToCartButton productId={productId} isAvailable={isAvailable} />
            <FavouriteButton productId={productId} />
        </>
    );
};
