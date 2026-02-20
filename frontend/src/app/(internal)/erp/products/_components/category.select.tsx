'use client';

import { type FC } from 'react';

import { LazySelect } from '@/components/base';
import { useProductPageContext } from '../_lib';
import { CategoriesQuery, CategoriesQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { CATEGORIES } from '@/shared/api/graphql/queries';
import { usePaginatedSelect } from '../../_lib';

export const CategorySelect: FC = () => {
    const { categoryId, setCategory } = useProductPageContext();
    const {
        options,
        hasNextPage,
        isLoading,
        onOpen,
        handleLoadMore,
    } = usePaginatedSelect<
        CategoriesQuery,
        CategoriesQuery['categories']['items'][number],
        CategoriesQueryVariables
    >({
        query: CATEGORIES,
        selectCollection: (data) => data.categories,
        mapItem: (item) => ({
            id: item.id,
            label: item.title,
        }),
        variables: {
            limit: 15,
        },
    });

    return (
        <LazySelect
            label="Категория"
            options={options}
            value={categoryId ?? ''}
            onChange={(id, label) => setCategory(id || null, label || null)}
            onOpen={onOpen}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isLoadingMore={isLoading}
            placeholder="Выберите категорию"
        />
    );
};
