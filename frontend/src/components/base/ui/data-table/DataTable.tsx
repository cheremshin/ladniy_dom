'use no memo';

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';

import { Button } from '../button/Button';

import './DataTable.styles.css';

export type DataTablePaginationProps = {
    hasNextPage: boolean;
    onLoadMore: () => void;
    isLoadingMore?: boolean;
    loadMoreLabel?: string;
};

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    isLoading?: boolean;
    emptyMessage?: string;
    pagination?: DataTablePaginationProps;
}

export function DataTable<TData>({
    columns,
    data,
    isLoading = false,
    emptyMessage = 'No data available',
    pagination,
}: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return (
            <div className="data-table-container">
                <div className="data-table-loading">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="data-table-wrapper">
            <div className="data-table-container">
                <table className="data-table">
                    <thead className="data-table-header">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="data-table-header-cell">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="data-table-body">
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="data-table-empty"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="data-table-row">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="data-table-cell">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {pagination?.hasNextPage && (
                <div className="data-table-pagination">
                    <Button
                        onClick={pagination.onLoadMore}
                        disabled={pagination.isLoadingMore}
                    >
                        {pagination.isLoadingMore
                            ? 'Загрузка…'
                            : (pagination.loadMoreLabel ?? 'Загрузить ещё')}
                    </Button>
                </div>
            )}
        </div>
    );
}
