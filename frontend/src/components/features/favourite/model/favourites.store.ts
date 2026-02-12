import { Id } from '@/shared/entities/common.types';
import { create } from 'zustand';

type FavouritesState = {
    favourites: Set<Id>;
};

type FavouritesStore = FavouritesState & {
    toggleFavourite: (id: Id) => void;
    clearFavourites: () => void;
};

export const useFavouritesStore = create<FavouritesStore>((set) => ({
    favourites: new Set(),

    toggleFavourite: (id) =>
        set((state) => {
            const next = new Set(state.favourites);

            if (next.has(id)) next.delete(id);
            else next.add(id);

            return { favourites: next };
        }),

    clearFavourites: () =>
        set(() => ({
            favourites: new Set(),
        })),
}));
