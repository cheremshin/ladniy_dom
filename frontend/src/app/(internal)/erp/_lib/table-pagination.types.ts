export type TablePaginationMeta = {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type FetchPageResult<T> = {
    items: T[];
    meta: TablePaginationMeta;
};

export type FetchPageFn<T> = (
    page: number,
    limit: number,
) => Promise<FetchPageResult<T>>;
