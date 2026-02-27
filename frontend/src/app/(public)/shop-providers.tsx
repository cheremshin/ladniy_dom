'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/shared/contexts/cart-provider';
import { FavouritesProvider } from '@/shared/contexts/favourites-provider';
import { Id } from '@/shared/entities';
import { useUser } from '@/shared/contexts/user-context';

type PropsT = {
    favourites: Id[];
    cart: { productId: Id; quantity: number }[];
    children: ReactNode;
};

export function ShopProviders({ favourites: initialFavourites, cart: initialCart, children }: PropsT) {
    const { user } = useUser();

    return (
        <CartProvider key={user?.userId ?? 'guest'} initialCart={initialCart}>
            <FavouritesProvider key={user?.userId ?? 'guest'} initialFavourites={initialFavourites}>
                {children}
            </FavouritesProvider>
        </CartProvider>
    );
}
