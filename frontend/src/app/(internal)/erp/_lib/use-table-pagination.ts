'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import type { TablePaginationMeta, FetchPageFn } from './table-pagination.types';

const EMPTY_META: TablePaginationMeta = {
    hasNextPage: false,
    hasPrevPage: false,
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
};

export type UseTablePaginationParams<T> = {
    pageSize: number;
    /** Функция загрузки страницы (page, limit) => Promise<{ items, meta }> */
    fetchPage: FetchPageFn<T>;
    /**
     * Когда false — данные не грузятся и сбрасываются до пустого состояния.
     * По умолчанию true.
     */
    enabled?: boolean;
};

export type UseTablePaginationResult<T> = {
    items: T[];
    meta: TablePaginationMeta;
    currentPage: number;
    isLoading: boolean;
    error: Error | null;
    hasNextPage: boolean;
    loadMore: () => Promise<void>;
    refetch: () => Promise<void>;
};

export function useTablePagination<T>({
    pageSize,
    fetchPage,
    enabled = true,
}: UseTablePaginationParams<T>): UseTablePaginationResult<T> {
    const [items, setItems] = useState<T[]>([]);
    const [meta, setMeta] = useState<TablePaginationMeta>(EMPTY_META);
    const [currentPage, setCurrentPage] = useState(0);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!enabled) {
            setItems([]);
            setMeta(EMPTY_META);
            setCurrentPage(0);
            setError(null);
            return;
        }

        let cancelled = false;
        setItems([]);
        setCurrentPage(0);
        setError(null);
        setIsInitialLoading(true);

        fetchPage(1, pageSize)
            .then((result) => {
                if (!cancelled) {
                    setItems(result.items);
                    setMeta(result.meta);
                    setCurrentPage(1);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                }
            })
            .finally(() => {
                if (!cancelled) setIsInitialLoading(false);
            });

        return () => {
            cancelled = true;
        };
    // fetchPage намеренно в deps: смена fetchPage (например, при новом categoryId)
    // является сигналом сбросить таблицу и загрузить заново.
    }, [enabled, fetchPage, pageSize]);

    const refetch = useCallback(async () => {
        setError(null);
        const limit = Math.max(currentPage, 1) * pageSize;
        try {
            const result = await fetchPage(1, limit);
            setItems(result.items);
            setMeta(result.meta);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        }
    }, [currentPage, pageSize, fetchPage]);

    const loadMore = useCallback(async () => {
        if (!meta.hasNextPage || isInitialLoading || isLoadingMore) return;

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
    }, [currentPage, meta.hasNextPage, isInitialLoading, isLoadingMore, pageSize, fetchPage]);

    const isLoading = isInitialLoading || isLoadingMore;

    return useMemo(
        () => ({
            items,
            meta,
            currentPage,
            isLoading,
            error,
            hasNextPage: meta.hasNextPage,
            loadMore,
            refetch,
        }),
        [items, meta, currentPage, isLoading, error, loadMore, refetch],
    );
}
