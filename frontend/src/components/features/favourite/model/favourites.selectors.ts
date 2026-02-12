import { Id } from '@/shared/entities/common.types';
import { useFavouritesStore } from './favourites.store';

export const useIsFavourite = (id: Id) =>
    useFavouritesStore((state) => state.favourites.has(id));

export const useFavouriteIds = () =>
    useFavouritesStore((state) => state.favourites);
