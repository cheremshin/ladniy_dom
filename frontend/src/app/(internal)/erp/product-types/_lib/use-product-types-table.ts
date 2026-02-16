'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useLazyQuery } from '@apollo/client/react';

import { useTablePagination } from '@/app/(internal)/erp/_lib';
import type { TablePaginationMeta } from '@/app/(internal)/erp/_lib';
import { PRODUCT_TYPES } from '@/shared/api/graphql/queries';
import { SOFT_DELETE_PRODUCT_TYPE } from '@/shared/api/graphql/mutations';
import type {
    ProductTypesQuery,
    ProductTypesQueryVariables,
    SoftDeleteProductTypeMutation,
    SoftDeleteProductTypeMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

import type { ProductType, ProductTypesTableInitialData } from './types';
import { PRODUCT_TYPES_PAGE_SIZE } from './constants';

function toTableMeta(
    meta: ProductTypesTableInitialData['productTypes']['meta'],
): TablePaginationMeta {
    return {
        hasNextPage: meta.hasNextPage,
        hasPrevPage: meta.hasPrevPage,
        total: meta.total,
        page: meta.page,
        limit: meta.limit,
        totalPages: meta.totalPages,
    };
}

type UseProductTypesTableParams = {
    initialData: ProductTypesTableInitialData;
};

export function useProductTypesTable({ initialData }: UseProductTypesTableParams) {
    const router = useRouter();

    const [fetchProductTypes] = useLazyQuery<
        ProductTypesQuery,
        ProductTypesQueryVariables
    >(PRODUCT_TYPES);

    const [deleteProductType] = useMutation<
        SoftDeleteProductTypeMutation,
        SoftDeleteProductTypeMutationVariables
    >(SOFT_DELETE_PRODUCT_TYPE);

    const fetchPage = useCallback(async (page: number, limit: number) => {
        const result = await fetchProductTypes({
            variables: {
                page,
                limit,
                includeInactive: true,
            },
        });
        if (result.error) throw result.error;

        const data = result.data?.productTypes;
        if (!data) throw new Error('Нет данных');

        return {
            items: data.items,
            meta: toTableMeta(data.meta),
        };
    }, [fetchProductTypes]);

    const pagination = useTablePagination<ProductType>({
        initialItems: initialData.productTypes.items,
        initialMeta: toTableMeta(initialData.productTypes.meta),
        pageSize: PRODUCT_TYPES_PAGE_SIZE,
        fetchPage,
    });

    const handleEdit = useCallback((productType: ProductType) => {
        router.push(`/erp/product-types/${productType.id}/edit`);
    }, [router]);

    const handleDelete = useCallback(
        async (productType: ProductType) => {
            if (
                !confirm(
                    `Вы действительно хотите удалить тип продукта: "${productType.title}"?`,
                )
            ) {
                return;
            }
            try {
                await deleteProductType({
                    variables: { id: productType.id },
                });
                await pagination.refetch();
            } catch (err) {
                console.error('Failed to delete productType:', err);
                alert(
                    'Не удалось удалить тип продукта, попробуйте позже или обратитесь в поддержку.',
                );
            }
        },
        [deleteProductType, pagination],
    );

    return useMemo(
        () => ({
            ...pagination,
            handleEdit,
            handleDelete,
        }),
        [pagination, handleEdit, handleDelete],
    );
}
