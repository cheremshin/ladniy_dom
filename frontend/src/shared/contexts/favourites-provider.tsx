'use client';

import { ReactNode, useRef } from 'react';
import { useFavouritesStore } from '@/components/features/favourite/model/favourites.store';
import { Id } from '../entities/common.types';

type PropsT = {
    initialFavourites: Id[];
    children: ReactNode;
};

export function FavouritesProvider({ initialFavourites, children }: PropsT) {
    const hydrated = useRef(false);

    if (!hydrated.current) {
        useFavouritesStore.setState({
            favourites: new Set(initialFavourites),
        });
        hydrated.current = true;
    }

    return <>{children}</>;
}
