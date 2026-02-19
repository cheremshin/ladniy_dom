'use client';

import { useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';

import type { LazySelectOption } from '@/components/base';
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { CATEGORIES } from '@/shared/api/graphql/queries';

const CATEGORY_SELECT_PAGE_SIZE = 15;

export function useCategorySelect() {
    const [options, setOptions] = useState<LazySelectOption[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    const [fetchCategories, { loading: isLoading }] = useLazyQuery<
        CategoriesQuery,
        CategoriesQueryVariables
    >(CATEGORIES);

    const loadPage = useCallback(async (pageNum: number) => {
        const { data } = await fetchCategories({
            variables: {
                page: pageNum,
                limit: CATEGORY_SELECT_PAGE_SIZE,
            },
        });

        const categories = data?.categories;
        if (!categories) return;

        const mapped: LazySelectOption[] = categories.items.map((item) => ({
            id: item.id,
            label: item.title,
        }));

        setOptions((prev) => (pageNum === 1 ? mapped : [...prev, ...mapped]));
        setHasNextPage(categories.meta.hasNextPage);
    }, [fetchCategories]);

    const onOpen = useCallback(() => {
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
