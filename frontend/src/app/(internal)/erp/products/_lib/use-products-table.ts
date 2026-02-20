'use client';

import { useCallback, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';

import { useTablePagination, toTableMeta } from '@/app/(internal)/erp/_lib';
import { PRODUCTS } from '@/shared/api/graphql/queries';
import { SOFT_DELETE_PRODUCT } from '@/shared/api/graphql/mutations';
import type {
    CatalogProductsQuery,
    CatalogProductsQueryVariables,
    SoftDeleteProductMutation,
    SoftDeleteProductMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

import type { Product } from './types';
import { PRODUCTS_PAGE_SIZE } from './constants';
import { useProductPageContext } from './product-page.context';

type UseProductsTableParams = {
    categoryId: string | null;
    productTypeId: string | null;
};

export function useProductsTable({ categoryId, productTypeId }: UseProductsTableParams) {
    const { updateModal } = useProductPageContext();
    const { openUpdate, setUpdateModalItem } = updateModal;

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
                categoryId: categoryId ?? undefined,
                productTypeId: productTypeId ?? undefined,
            },
        });
        if (result.error) throw result.error;
        const data = result.data?.products;
        if (!data) throw new Error('Нет данных');
        return {
            items: data.items,
            meta: toTableMeta(data.meta),
        };
    }, [fetchProducts, categoryId, productTypeId]);

    const pagination = useTablePagination<Product>({
        pageSize: PRODUCTS_PAGE_SIZE,
        fetchPage,
        enabled: !!categoryId && !!productTypeId,
    });

    const handleEdit = useCallback((product: Product) => {
        setUpdateModalItem(product);
        openUpdate();
    }, [openUpdate, setUpdateModalItem]);

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
