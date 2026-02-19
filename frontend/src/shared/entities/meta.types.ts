import type { OperationVariables } from '@apollo/client';

type PaginatedMeta = {
    hasNextPage: boolean;
};

export type PaginatedCollection<TItem> = {
    items: TItem[];
    meta: PaginatedMeta;
};

export type PaginationVariables = OperationVariables & {
    page: number;
    limit: number;
};
