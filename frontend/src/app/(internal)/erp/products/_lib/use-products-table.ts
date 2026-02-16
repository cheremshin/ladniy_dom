'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useLazyQuery } from '@apollo/client/react';

import { useTablePagination } from '@/app/(internal)/erp/_lib';
import type { TablePaginationMeta } from '@/app/(internal)/erp/_lib';
import { PRODUCTS } from '@/shared/api/graphql/queries';
import { SOFT_DELETE_PRODUCT } from '@/shared/api/graphql/mutations';
import type {
    CatalogProductsQuery,
    CatalogProductsQueryVariables,
    SoftDeleteProductMutation,
    SoftDeleteProductMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

import type { Product, ProductsTableInitialData } from './types';
import { PRODUCTS_PAGE_SIZE } from './constants';

function toTableMeta(
    meta: ProductsTableInitialData['products']['meta'],
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

type UseProductsTableParams = {
    initialData: ProductsTableInitialData;
};

export function useProductsTable({ initialData }: UseProductsTableParams) {
    const router = useRouter();

    const [fetchProducts] = useLazyQuery<
        CatalogProductsQuery,
        CatalogProductsQueryVariables
    >(PRODUCTS);

    const [deleteProduct] = useMutation<
        SoftDeleteProductMutation,
        SoftDeleteProductMutationVariables
    >(SOFT_DELETE_PRODUCT);

    const fetchPage = useCallback(async (page: number, limit: number) => {
        const result = await fetchProducts({
            variables: {
                page,
                limit,
                includeDeleted: true,
            },
        });
        if (result.error) throw result.error;
        const data = result.data?.products;
        if (!data) throw new Error('Нет данных');
        return {
            items: data.items,
            meta: toTableMeta(data.meta),
        };
    }, [fetchProducts]);

    const pagination = useTablePagination<Product>({
        initialItems: initialData.products.items,
        initialMeta: toTableMeta(initialData.products.meta),
        pageSize: PRODUCTS_PAGE_SIZE,
        fetchPage,
    });

    const handleEdit = useCallback((product: Product) => {
        router.push(`/erp/products/${product.id}/edit`);
    }, [router]);

    const handleDelete = useCallback(
        async (product: Product) => {
            if (
                !confirm(
                    `Вы действительно хотите удалить продукт: "${product.title}"?`,
                )
            ) {
                return;
            }
            try {
                await deleteProduct({
                    variables: { id: product.id },
                });
                await pagination.refetch();
            } catch (err) {
                console.error('Failed to delete product:', err);
                alert(
                    'Не удалось удалить продукт, попробуйте позже или обратитесь в поддержку.',
                );
            }
        },
        [deleteProduct, pagination],
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
