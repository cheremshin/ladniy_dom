'use client';

import { Button } from '@/components/base';
import { FavouriteIcon } from '@/components/dummies/icons';
import { Id } from '@/shared/entities/common.types';
import { FC } from 'react';
import { useFavourite } from '../model/useFavourite';

import './FavouriteButton.styles.css';

type PropsT = {
    productId: Id;
};

export const FavouriteButton: FC<PropsT> = ({ productId }) => {
    const { isFavourite, toggleFavourite, isPending } = useFavourite(productId);

    return (
        <Button
            onClick={() => toggleFavourite()}
            disabled={isPending}
            variant="secondary"
            className={isFavourite ? 'favourite-icon--active' : ''}
        >
            <FavouriteIcon />
        </Button>
    );
};
