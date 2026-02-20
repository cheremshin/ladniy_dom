import { ColumnDef } from '@tanstack/react-table';

export interface EntityTableConfig<T> {
    columns: ColumnDef<T>[];
    getRowId?: (row: T) => string;
    emptyMessage?: string;
}

export interface EntityTableData<T> {
    items: T[];
    isLoading: boolean;
    error?: Error | null;
}

export interface EntityTableActions<T> {
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}
