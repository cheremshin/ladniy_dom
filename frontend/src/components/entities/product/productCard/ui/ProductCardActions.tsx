'use client';

import { Button } from '@/components/base/ui/Button';
import { FavouriteIcon } from '@/components/dummies/icons/FavouriteIcon';
import { FC, useState, useTransition } from 'react';

type PropsT = {
    productId: string;
    isAvailable: boolean;
    initialFavouriteStatus: boolean;
}

export const ProductCardActions: FC<PropsT> = ({
    productId,
    isAvailable,
    initialFavouriteStatus,
}) => {
    const [isFavourite, setIsFavourite] = useState(initialFavouriteStatus);
    const [isPending, startTransition] = useTransition();

    const handleAddToCard = () => {
        startTransition(async () => {
            // Add to cart logic
        });
    };

    const handleToggleFavourite = () => {
        startTransition(async () => {
            // Toggle favourite logic
            setIsFavourite((prev) => !prev);
        });
    };

    return (
        <>
            <Button
                onClick={handleAddToCard}
                disabled={!isAvailable || isPending}
            >
                {isAvailable ? 'В корзину' : 'Нет в наличии'}
            </Button>
            <Button
                onClick={handleToggleFavourite}
                variant='secondary'
                disabled={isPending}
                className={isFavourite ? 'favourite-icon--active' : ''}
            >
                <FavouriteIcon />
            </Button>
        </>
    );
};
