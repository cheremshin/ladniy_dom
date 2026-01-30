'use server';

import { DocumentNode } from '@apollo/client';
import { print } from 'graphql';

const GRAPHQL_URL = process.env.GRAPHQL_API ?? 'http://localhost:3000/graphql';

console.log(GRAPHQL_URL);

export async function graphqlFetch<TData, TVars = Record<string, unknown>> (
    query: DocumentNode,
    variables: TVars,
): Promise<TData> {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: print(query),
            variables,
        }),
    });

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0]?.message ?? 'GraphQL error');
    }

    return json.data as TData;
}
