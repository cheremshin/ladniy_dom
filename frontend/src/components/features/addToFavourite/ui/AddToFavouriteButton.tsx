'use client';

import { Button } from '@/components/base';
import { FavouriteIcon } from '@/components/dummies/icons';
import { Id } from '@/shared/entities/common.types';
import { FC } from 'react';
import { useAddToFavourite } from '../model/useAddToFavourite';

import './AddToFavouriteButton.styles.css';

type PropsT = {
    productId: Id;
};

export const AddToFavouriteButton: FC<PropsT> = ({ productId }) => {
    const { isFavourite, isPending, handleToggleFavourite } = useAddToFavourite();

    return (
        <Button
            onClick={() => handleToggleFavourite(productId)}
            disabled={isPending}
            variant="secondary"
            className={isFavourite ? 'favourite-icon--active' : ''}
        >
            <FavouriteIcon />
        </Button>
    );
};
