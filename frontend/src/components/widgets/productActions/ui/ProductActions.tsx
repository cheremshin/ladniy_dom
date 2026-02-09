'use client';

import { AddToFavouriteButton } from '@/components/features/addToFavourite';
import { AddToCartButton } from '@/components/features/addToCart';
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
            <AddToFavouriteButton productId={productId} />
        </>
    );
};
