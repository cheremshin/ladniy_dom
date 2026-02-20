'use client';

import { FC, useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable, TableActions, TableLink } from '@/components/base';
import { useProductTypesTable, useProductTypesPageContext } from '../_lib';
import type { ProductType } from '../_lib';

export const ProductTypesTable: FC = () => {
    const { categoryId, registerRefetch } = useProductTypesPageContext();
    const {
        items,
        isLoading,
        error,
        hasNextPage,
        handleEdit,
        handleDelete,
        loadMore,
        refetch,
    } = useProductTypesTable({ categoryId });

    useEffect(() => {
        registerRefetch(refetch);
    }, [registerRefetch, refetch]);

    const columns = useMemo<ColumnDef<ProductType>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Название',
                cell: ({ row }) => (
                    <TableLink href={`/erp/product-types/${row.original.id}`}>
                        {row.original.title}
                    </TableLink>
                ),
            },
            {
                accessorKey: 'plural',
                header: 'Множественное число',
            },
            {
                accessorKey: 'slug',
                header: 'Slug',
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

    if (!categoryId) {
        return (
            <div style={{ padding: '20px', color: '#6b7280' }}>
                Выберите категорию, чтобы увидеть типы продуктов
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#dc2626' }}>
                Ошибка загрузки типов продуктов:
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
            emptyMessage="Типы продуктов не найдены"
            pagination={
                hasNextPage ? {
                    hasNextPage,
                    onLoadMore: loadMore,
                    loadMoreLabel: 'Загрузить ещё',
                } : undefined
            }
        />
    );
};
