'use client';

import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { ApolloProvider } from '@apollo/client/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={apolloBrowserClient}>
            {children}
        </ApolloProvider>
    );
}
