import { ListResult } from '@/common/domain/list-result.type';

export function buildPaginatedResponse<T>(result: ListResult<T>, page: number, limit: number) {
    const totalPages = Math.ceil(result.total / limit);
    return {
        items: result.items,
        meta: {
            total: result.total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    };
}
