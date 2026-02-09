import { DocumentNode } from '@apollo/client';
import { print } from 'graphql';

const GRAPHQL_URL = process.env.GRAPHQL_API ?? 'http://localhost:3000/graphql';

type FetchOptions = {
    revalidate?: number | false;
};

export async function graphqlFetch<TData, TVars = Record<string, unknown>>(
    query: DocumentNode,
    variables?: TVars,
    options?: FetchOptions,
): Promise<TData> {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: print(query),
            variables,
        }),
        next: {
            revalidate: options?.revalidate ?? 60,
        },
    });

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0]?.message ?? 'GraphQL error');
    }

    return json.data as TData;
}
