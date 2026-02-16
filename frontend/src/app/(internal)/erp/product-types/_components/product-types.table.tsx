'use client';

import { FC, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable, TableActions, TableLink } from '@/components/base';
import { useProductTypesTable } from '../_lib';
import type { ProductType } from '../_lib';

type PropsT = {
    initialProductTypes: Parameters<typeof useProductTypesTable>[0]['initialData'];
};

export const ProductTypesTable: FC<PropsT> = ({ initialProductTypes }) => {
    const {
        items,
        isLoadingMore,
        error,
        hasNextPage,
        handleEdit,
        handleDelete,
        loadMore,
    } = useProductTypesTable({ initialData: initialProductTypes });

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
            isLoading={false}
            emptyMessage="Типы продуктов не найдены"
            pagination={
                hasNextPage ? {
                    hasNextPage,
                    onLoadMore: loadMore,
                    isLoadingMore,
                    loadMoreLabel: 'Загрузить ещё',
                } : undefined
            }
        />
    );
};
