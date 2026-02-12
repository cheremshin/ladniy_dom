'use client';

import { UserProvider } from '@/shared/contexts/user-context';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { RawUser } from '@/shared/contexts/user-context';
import { FavouritesProvider } from '@/shared/contexts/favourites-provider';
import { Id } from '@/shared/entities/common.types';

type PropsT = {
    user: RawUser;
    favourites: Id[] | null;
    children: ReactNode;
};

export function Providers({ user, favourites: initialFavourites, children }: PropsT) {
    return (
        <ApolloProvider client={apolloBrowserClient}>
            <UserProvider initialUser={user}>
                <FavouritesProvider initialFavourites={initialFavourites}>
                    {children}
                </FavouritesProvider>
            </UserProvider>
        </ApolloProvider>
    );
}
