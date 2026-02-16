import { DocumentNode } from '@apollo/client';
import { print } from 'graphql';
import { cookies } from 'next/headers';

const GRAPHQL_URL = process.env.GRAPHQL_API ?? 'http://localhost:3000/graphql';

type FetchOptions = {
    revalidate?: number | false;
};

export async function graphqlFetch<TData, TVars = Record<string, unknown>>(
    query: DocumentNode,
    variables?: TVars,
    options?: FetchOptions,
): Promise<TData> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        body: JSON.stringify({ query: print(query), variables }),
        next: { revalidate: options?.revalidate ?? undefined },
    });

    const json = await response.json();

    if (json.errors) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`Error while fetching [QUERY]: ${print(query)} [ERROR]: ${json.errors[0]?.message}`);
        }
        throw new Error(json.errors[0]?.message ?? 'Internal server error');
    }

    return json.data as TData;
}
