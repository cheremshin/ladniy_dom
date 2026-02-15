'use client';

import { UserProvider } from '@/shared/contexts/user-context';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { RawUser } from '@/shared/mappers/user.mapper';
import { Id } from '@/shared/entities';
import { FavouritesProvider } from '@/shared/contexts/favourites-provider';
import { CartProvider } from '@/shared/contexts/cart-provider';

type PropsT = {
    user: RawUser;
    favourites: Id[];
    cart: { productId: Id; quantity: number }[];
    children: ReactNode;
};

export function Providers({ user, favourites: initialFavourites, cart: initialCart, children }: PropsT) {
    return (
        <ApolloProvider client={apolloBrowserClient}>
            <UserProvider initialUser={user}>
                <FavouritesProvider key={user?.id ?? 'guest'} initialFavourites={initialFavourites}>
                    <CartProvider key={user?.id ?? 'guest'} initialCart={initialCart}>
                        {children}
                    </CartProvider>
                </FavouritesProvider>
            </UserProvider>
        </ApolloProvider>
    );
}
