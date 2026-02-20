'use client';

import { FC, useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable, TableActions, TableLink } from '@/components/base';
import { useCategoriesPageContext, useCategoriesTable } from '../_lib';
import type { Category } from '../_lib';

export const CategoriesTable: FC = () => {
    const {
        items,
        isLoading,
        error,
        hasNextPage,
        handleEdit,
        handleDelete,
        loadMore,
        refetch,
    } = useCategoriesTable();

    const { registerRefetch } = useCategoriesPageContext();

    useEffect(() => {
        registerRefetch(refetch);
    }, [registerRefetch, refetch]);

    const columns = useMemo<ColumnDef<Category>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Название',
                cell: ({ row }) => (
                    <TableLink href={`/erp/categories/${row.original.id}`}>
                        {row.original.title}
                    </TableLink>
                ),
            },
            {
                accessorKey: 'slug',
                header: 'Slug',
            },
            {
                accessorKey: 'sortOrder',
                header: 'Порядок сортировки (от меньшего к большему)',
            },
            {
                accessorKey: 'isActive',
                header: 'Статус',
                cell: ({ row }) =>
                    row.original.isActive ? (
                        <span style={{ color: '#16a34a' }}>Active</span>
                    ) : (
                        <span style={{ color: '#dc2626' }}>Inactive</span>
                    ),
            },
            {
                id: 'actions',
                header: 'Действия',
                cell: ({ row }) => (
                    <TableActions
                        onEdit={() => handleEdit(row.original)}
                        onDelete={() => handleDelete(row.original)}
                    />
                ),
            },
        ],
        [handleEdit, handleDelete],
    );

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#dc2626' }}>
                Ошибка загрузки категорий:
                {' '}
                {error.message}
            </div>
        );
    }

    return (
        <DataTable
            columns={columns}
            data={items}
            isLoading={isLoading}
            emptyMessage="Категории не найдены"
            pagination={
                hasNextPage ? {
                    hasNextPage,
                    onLoadMore: loadMore,
                    loadMoreLabel: 'Загрузить еще',
                } : undefined
            }
        />
    );
};
