import { Id } from '@/shared/entities/common.types';
import { useIsFavourite } from './favourites.selectors';
import { useTransition } from 'react';
import { toggleFavouriteAction } from '@/server/actions/favourites';
import { useFavouritesStore } from './favourites.store';

export function useFavourite(productId: Id) {
    const isFavourite = useIsFavourite(productId);
    const [isPending, startTransition] = useTransition();

    const toggleFavourite = () => {
        useFavouritesStore.getState().toggleFavourite(productId);

        startTransition(async () => {
            try {
                await toggleFavouriteAction(productId);
            } catch {
                useFavouritesStore.getState().toggleFavourite(productId);
            }
        });
    };

    return {
        isFavourite,
        toggleFavourite,
        isPending,
    };
}
