'use client';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloBrowserClient = new ApolloClient({
    link: new HttpLink({
        uri: process.env.GRAPHQL_API ?? 'http://localhost:3000/graphql',
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'cache-first',
        }
    }
});
