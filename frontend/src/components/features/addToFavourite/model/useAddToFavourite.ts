'use client';

import { useState, useTransition } from 'react';
import { Id } from '@/shared/entities/common.types';

export function useAddToFavourite() {
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const handleToggleFavourite = (productId: Id) => {
        startTransition(async () => {
            // Add to favourite logic
            setIsFavourite((prev) => !prev);
        });
    };

    return {
        isFavourite,
        isPending,
        handleToggleFavourite,
    };
}
