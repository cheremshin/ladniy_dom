'use client';

import { useCallback, useMemo, useState } from 'react';

import type { TablePaginationMeta, FetchPageFn } from './table-pagination.types';

export type UseTablePaginationParams<T> = {
    initialItems: T[];
    initialMeta: TablePaginationMeta;
    pageSize: number;
    /** Функция загрузки страницы (page, limit) => Promise<{ items, meta }> */
    fetchPage: FetchPageFn<T>;
};

export type UseTablePaginationResult<T> = {
    items: T[];
    meta: TablePaginationMeta;
    currentPage: number;
    isLoadingMore: boolean;
    error: Error | null;
    hasNextPage: boolean;
    loadMore: () => Promise<void>;
    refetch: () => Promise<void>;
};

export function useTablePagination<T>({
    initialItems,
    initialMeta,
    pageSize,
    fetchPage,
}: UseTablePaginationParams<T>): UseTablePaginationResult<T> {
    const [items, setItems] = useState<T[]>(initialItems);
    const [meta, setMeta] = useState<TablePaginationMeta>(initialMeta);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(async () => {
        setError(null);
        const limit = currentPage * pageSize;
        try {
            const result = await fetchPage(1, limit);
            setItems(result.items);
            setMeta(result.meta);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        }
    }, [currentPage, pageSize, fetchPage]);

    const loadMore = useCallback(async () => {
        if (!meta.hasNextPage || isLoadingMore) return;

        setIsLoadingMore(true);
        setError(null);

        const nextPage = currentPage + 1;
        try {
            const result = await fetchPage(nextPage, pageSize);
            setItems((prev) => [...prev, ...result.items]);
            setMeta(result.meta);
            setCurrentPage(nextPage);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setIsLoadingMore(false);
        }
    }, [currentPage, meta.hasNextPage, isLoadingMore, pageSize, fetchPage]);

    return useMemo(
        () => ({
            items,
            meta,
            currentPage,
            isLoadingMore,
            error,
            hasNextPage: meta.hasNextPage,
            loadMore,
            refetch,
        }),
        [
            items,
            meta,
            currentPage,
            isLoadingMore,
            error,
            loadMore,
            refetch,
        ],
    );
}
