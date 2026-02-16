import { TableLayout } from '@/components/dummies/erp/tableLayout';
import { Card } from '@/components/base';
import { graphqlFetch } from '@/server/apollo/client/graphql-fetch';
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { CATEGORIES } from '@/shared/api/graphql/queries/category';
import { Suspense } from 'react';

import { CategoriesTable } from './_components/categories.table';
import { CATEGORIES_PAGE_SIZE } from './_lib/constants';

export default async function Page() {
    const initialCategories = await graphqlFetch<
        CategoriesQuery,
        CategoriesQueryVariables
    >(CATEGORIES, {
        page: 1,
        limit: CATEGORIES_PAGE_SIZE,
        includeInactive: true,
    });

    return (
        <TableLayout tableName="Категории" newItemUrl="/erp/categories/new">
            <Suspense fallback={<Card>Загрузка...</Card>}>
                <CategoriesTable initialCategories={initialCategories} />
            </Suspense>
        </TableLayout>
    );
}
