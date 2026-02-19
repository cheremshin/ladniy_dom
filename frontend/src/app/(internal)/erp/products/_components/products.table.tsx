'use client';

import { FC, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable, TableActions, TableLink } from '@/components/base';
import { useProductPageContext, useProductsTable } from '../_lib';
import type { Product } from '../_lib';

export const ProductsTable: FC = () => {
    const { categoryId, productTypeId } = useProductPageContext();
    const {
        items,
        isLoading,
        error,
        hasNextPage,
        handleEdit,
        handleDelete,
        loadMore,
    } = useProductsTable({ categoryId, productTypeId });

    const columns = useMemo<ColumnDef<Product>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Название',
                cell: ({ row }) => (
                    <TableLink href={`/erp/products/${row.original.id}`}>
                        {row.original.title}
                    </TableLink>
                ),
            },
            {
                accessorKey: 'slug',
                header: 'Slug',
            },
            {
                accessorKey: 'sku',
                header: 'Артикул',
            },
            {
                accessorKey: 'basePrice',
                header: 'Цена',
                cell: ({ row }) => `${row.original.basePrice} ₽`,
            },
            {
                accessorKey: 'stockQuantity',
                header: 'Остаток',
            },
            {
                accessorKey: 'status',
                header: 'Статус',
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
                Выберите категорию
            </div>
        );
    }

    if (!productTypeId) {
        return (
            <div style={{ padding: '20px', color: '#6b7280' }}>
                Выберите тип продукта
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#dc2626' }}>
                Ошибка загрузки продуктов:
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
            emptyMessage="Продукты не найдены"
            pagination={
                hasNextPage
                    ? {
                            hasNextPage,
                            onLoadMore: loadMore,
                            loadMoreLabel: 'Загрузить ещё',
                        }
                    : undefined
            }
        />
    );
};
