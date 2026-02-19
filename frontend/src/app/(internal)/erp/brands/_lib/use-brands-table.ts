'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useLazyQuery } from '@apollo/client/react';

import { useTablePagination } from '@/app/(internal)/erp/_lib';
import type { TablePaginationMeta } from '@/app/(internal)/erp/_lib';
import { BRANDS } from '@/shared/api/graphql/queries/brand';
import { SOFT_DELETE_BRAND } from '@/shared/api/graphql/mutations/brand';
import type {
    BrandsQuery,
    BrandsQueryVariables,
    SoftDeleteBrandMutation,
    SoftDeleteBrandMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

import type { Brand } from './types';
import { BRANDS_PAGE_SIZE } from './constants';

function toTableMeta(meta: BrandsQuery['brands']['meta']): TablePaginationMeta {
    return {
        hasNextPage: meta.hasNextPage,
        hasPrevPage: meta.hasPrevPage,
        total: meta.total,
        page: meta.page,
        limit: meta.limit,
        totalPages: meta.totalPages,
    };
}

export function useBrandsTable() {
    const router = useRouter();

    const [fetchBrands] = useLazyQuery<BrandsQuery, BrandsQueryVariables>(BRANDS);
    const [deleteBrand] = useMutation<
        SoftDeleteBrandMutation,
        SoftDeleteBrandMutationVariables
    >(SOFT_DELETE_BRAND);

    const fetchPage = useCallback(async (page: number, limit: number) => {
        const result = await fetchBrands({
            variables: {
                page,
                limit,
                includeInactive: true,
            },
        });
        if (result.error) throw result.error;
        const data = result.data?.brands;
        if (!data) throw new Error('Нет данных');
        return {
            items: data.items,
            meta: toTableMeta(data.meta),
        };
    }, [fetchBrands]);

    const pagination = useTablePagination<Brand>({
        pageSize: BRANDS_PAGE_SIZE,
        fetchPage,
    });

    const handleEdit = useCallback((brand: Brand) => {
        router.push(`/erp/brands/${brand.id}/edit`);
    }, [router]);

    const handleDelete = useCallback(
        async (brand: Brand) => {
            if (
                !confirm(`Вы действительно хотите удалить бренд: "${brand.title}"?`)
            ) {
                return;
            }
            try {
                await deleteBrand({
                    variables: { id: brand.id },
                });
                await pagination.refetch();
            } catch (err) {
                console.error('Failed to delete brand:', err);
                alert(
                    'Не удалось удалить бренд, попробуйте позже или обратитесь в поддержку.',
                );
            }
        },
        [deleteBrand, pagination],
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
