'use client';

import { UserProvider } from '@/shared/contexts/user-context';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { RawUser } from '@/shared/mappers/user.mapper';

type PropsT = {
    user: RawUser;
    children: ReactNode;
};

export function Providers({ user, children }: PropsT) {
    return (
        <ApolloProvider client={apolloBrowserClient}>
            <UserProvider initialUser={user}>
                {children}
            </UserProvider>
        </ApolloProvider>
    );
}
