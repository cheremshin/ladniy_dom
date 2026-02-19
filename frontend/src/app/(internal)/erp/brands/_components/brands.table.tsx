'use client';

import { FC, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable, TableActions, TableLink } from '@/components/base';
import { useBrandsTable } from '../_lib';
import type { Brand } from '../_lib';

export const BrandsTable: FC = () => {
    const {
        items,
        isLoading,
        error,
        hasNextPage,
        handleEdit,
        handleDelete,
        loadMore,
    } = useBrandsTable();

    const columns = useMemo<ColumnDef<Brand>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Название',
                cell: ({ row }) => (
                    <TableLink href={`/erp/brands/${row.original.id}`}>
                        {row.original.title}
                    </TableLink>
                ),
            },
            {
                accessorKey: 'slug',
                header: 'Slug',
            },
            {
                accessorKey: 'country',
                header: 'Страна',
                cell: ({ row }) => row.original.country || '—',
            },
            {
                accessorKey: 'website',
                header: 'Официальный сайт компании',
                cell: ({ row }) =>
                    row.original.website ? (
                        <a
                            href={row.original.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="data-table-link"
                        >
                            {row.original.website}
                        </a>
                    ) : (
                        '—'
                    ),
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
                Ошибка загрузки брендов:
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
            emptyMessage="Бренды не найдены"
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
