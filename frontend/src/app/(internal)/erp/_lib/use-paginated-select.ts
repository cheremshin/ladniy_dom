'use client';

import type { LazySelectOption } from '@/components/base';
import { PaginatedCollection } from '@/shared/entities';
import { DocumentNode, OperationVariables } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { useCallback, useEffect, useRef, useState } from 'react';

type UsePaginatedSelectParams<TData, TItem, TVariables> = {
    query: DocumentNode;
    selectCollection: (data: TData) => PaginatedCollection<TItem>;
    mapItem: (item: TItem) => LazySelectOption;
    variables: TVariables;
    initialOption?: LazySelectOption;
};

export function usePaginatedSelect<
    TData,
    TItem,
    TVariables extends OperationVariables,
>({
    query,
    selectCollection,
    mapItem,
    variables,
    initialOption,
}: UsePaginatedSelectParams<TData, TItem, TVariables>) {
    const variablesRef = useRef(variables);
    const [options, setOptions] = useState<LazySelectOption[]>(initialOption ? [initialOption] : []);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        variablesRef.current = variables;
    }, [variables]);

    const [fetch, { loading: isLoading }] = useLazyQuery<TData, TVariables>(query);

    const loadPage = useCallback(
        async (pageNum: number) => {
            const { data } = await fetch({
                variables: {
                    page: pageNum,
                    ...variablesRef.current,
                },
            }) ?? {};

            if (!data) return;

            const collection = selectCollection(data);
            const mapped = collection?.items.map(mapItem) ?? [];
            setOptions((prev) => pageNum === 1 ? mapped : [...prev, ...mapped]);
            setHasNextPage(collection?.meta?.hasNextPage ?? false);
        },
        [fetch, selectCollection, mapItem],
    );

    const onOpen = useCallback(() => {
        setPage(1);
        loadPage(1);
    }, [loadPage]);

    const handleLoadMore = useCallback(() => {
        if (!hasNextPage || isLoading) return;

        const nextPage = page + 1;
        setPage(nextPage);
        loadPage(nextPage);
    }, [page, hasNextPage, isLoading, loadPage]);

    return {
        options,
        hasNextPage,
        isLoading,
        onOpen,
        handleLoadMore,
    };
}
