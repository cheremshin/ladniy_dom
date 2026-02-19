'use client';

import { useEffect, type FC } from 'react';

import { LazySelect } from '@/components/base';
import { useSpecificationsPageContext } from '../_lib';
import { usePaginatedSelect } from '../../_lib';
import { ProductTypesQuery, ProductTypesQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { PRODUCT_TYPES } from '@/shared/api/graphql/queries';

export const ProductTypeSelect: FC = () => {
    const { categoryId, productTypeId, setProductType } = useSpecificationsPageContext();
    const {
        options,
        hasNextPage,
        isLoading,
        onOpen,
        handleLoadMore,
    } = usePaginatedSelect<
        ProductTypesQuery,
        ProductTypesQuery['productTypes']['items'][number],
        ProductTypesQueryVariables
    >({
        query: PRODUCT_TYPES,
        selectCollection: (data) => data.productTypes,
        mapItem: (item) => ({
            id: item.id,
            label: item.title,
        }),
        variables: {
            limit: 15,
            categoryId,
        },
    });

    useEffect(() => {
        setProductType('');
        onOpen();
    }, [categoryId, setProductType, onOpen]);

    return (
        <LazySelect
            label="Тип продукта"
            options={options}
            value={productTypeId ?? ''}
            onChange={(id) => setProductType(id || null)}
            onOpen={onOpen}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isLoadingMore={isLoading}
            placeholder="Выберите тип продукта"
        />
    );
};
