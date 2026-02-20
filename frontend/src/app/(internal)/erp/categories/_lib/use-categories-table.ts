'use client';

import { useCallback, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';

import { useTablePagination, toTableMeta } from '@/app/(internal)/erp/_lib';
import { CATEGORIES } from '@/shared/api/graphql/queries';
import { SOFT_DELETE_CATEGORY } from '@/shared/api/graphql/mutations/category';
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
    SoftDeleteCategoryMutation,
    SoftDeleteCategoryMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

import type { Category } from './types';
import { CATEGORIES_PAGE_SIZE } from './constants';
import { useCategoriesPageContext } from './categories-page.context';

export function useCategoriesTable() {
    const { updateModal } = useCategoriesPageContext();
    const { openUpdate, setUpdateModalItem } = updateModal;

    const [fetchCategories] = useLazyQuery<
        CategoriesQuery,
        CategoriesQueryVariables
    >(CATEGORIES);
    const [deleteCategory] = useMutation<
        SoftDeleteCategoryMutation,
        SoftDeleteCategoryMutationVariables
    >(SOFT_DELETE_CATEGORY);

    const fetchPage = useCallback(async (page: number, limit: number) => {
        const result = await fetchCategories({
            variables: {
                page,
                limit,
                includeInactive: true,
            },
        });
        if (result.error) throw result.error;
        const data = result.data?.categories;
        if (!data) throw new Error('Нет данных');
        return {
            items: data.items,
            meta: toTableMeta(data.meta),
        };
    }, [fetchCategories]);

    const pagination = useTablePagination<Category>({
        pageSize: CATEGORIES_PAGE_SIZE,
        fetchPage,
    });

    const handleEdit = useCallback((category: Category) => {
        setUpdateModalItem(category);
        openUpdate();
    }, [openUpdate, setUpdateModalItem]);

    const handleDelete = useCallback(
        async (category: Category) => {
            if (
                !confirm(
                    `Вы действительно хотите удалить категорию: "${category.title}"?`,
                )
            ) {
                return;
            }
            try {
                await deleteCategory({
                    variables: { id: category.id },
                });
                await pagination.refetch();
            } catch (err) {
                console.error('Failed to delete category:', err);
                alert(
                    'Не удалось удалить категорию, попробуйте позже или обратитесь в поддержку.',
                );
            }
        },
        [deleteCategory, pagination],
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
