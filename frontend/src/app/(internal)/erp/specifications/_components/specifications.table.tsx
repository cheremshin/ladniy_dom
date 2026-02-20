'use client';

import { FC, useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable, TableActions, TableLink } from '@/components/base';
import { useSpecificationsPageContext, useSpecificationsTable } from '../_lib';
import type { SpecificationDefinition } from '../_lib';

export const SpecificationsTable: FC = () => {
    const { categoryId, productTypeId, registerRefetch } = useSpecificationsPageContext();
    const {
        items,
        isLoading,
        error,
        hasNextPage,
        handleEdit,
        handleDelete,
        loadMore,
        refetch,
    } = useSpecificationsTable({ productTypeId });

    useEffect(() => {
        registerRefetch(refetch);
    }, [registerRefetch, refetch]);

    const columns = useMemo<ColumnDef<SpecificationDefinition>[]>(
        () => [
            {
                accessorKey: 'displayName',
                header: 'Название',
                cell: ({ row }) => (
                    <TableLink href={`/erp/specifications/${row.original.id}`}>
                        {row.original.displayName}
                    </TableLink>
                ),
            },
            {
                accessorKey: 'key',
                header: 'Ключ',
            },
            {
                accessorKey: 'productTypeId',
                header: 'ID типа продукта',
            },
            {
                accessorKey: 'unit',
                header: 'Единица',
                cell: ({ row }) => row.original.unit || '—',
            },
            {
                accessorKey: 'isFilterable',
                header: 'В фильтрах',
                cell: ({ row }) => (row.original.isFilterable ? 'Да' : 'Нет'),
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
                Ошибка загрузки спецификаций:
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
            emptyMessage="Спецификации не найдены"
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
