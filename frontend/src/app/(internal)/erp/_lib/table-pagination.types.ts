export type TablePaginationMeta = {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export function toTableMeta(
    meta: Pick<TablePaginationMeta, keyof TablePaginationMeta>,
): TablePaginationMeta {
    return {
        hasNextPage: meta.hasNextPage,
        hasPrevPage: meta.hasPrevPage,
        total: meta.total,
        page: meta.page,
        limit: meta.limit,
        totalPages: meta.totalPages,
    };
}

export type FetchPageResult<T> = {
    items: T[];
    meta: TablePaginationMeta;
};

export type FetchPageFn<T> = (
    page: number,
    limit: number,
) => Promise<FetchPageResult<T>>;
