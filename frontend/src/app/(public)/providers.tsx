'use client';

import { CartProvider } from '@/shared/contexts/cart-provider';
import { FavouritesProvider } from '@/shared/contexts/favourites-provider';
import { useUser } from '@/shared/contexts/user-context';
import { Id } from '@/shared/entities/common.types';
import { ReactNode } from 'react';

type PropsT = {
    favourites: Id[];
    cart: { productId: Id; quantity: number }[];
    children: ReactNode;
};

export function Providers({ favourites: initialFavourites, cart: initialCart, children }: PropsT) {
    const { user } = useUser();

    return (
        <FavouritesProvider key={user?.userId ?? 'guest'} initialFavourites={initialFavourites}>
            <CartProvider key={user?.userId ?? 'guest'} initialCart={initialCart}>
                {children}
            </CartProvider>
        </FavouritesProvider>
    );
}
