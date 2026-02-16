import { TableLayout } from '@/components/dummies/erp/tableLayout';
import { Card } from '@/components/base';
import { graphqlFetch } from '@/server/apollo/client/graphql-fetch';
import type { BrandsQuery, BrandsQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { BRANDS } from '@/shared/api/graphql/queries/brand';
import { Suspense } from 'react';

import { BrandsTable } from './_components/brands.table';
import { BRANDS_PAGE_SIZE } from './_lib/constants';

export default async function Page() {
    const initialBrands = await graphqlFetch<BrandsQuery, BrandsQueryVariables>(
        BRANDS,
        {
            page: 1,
            limit: BRANDS_PAGE_SIZE,
            includeInactive: true,
        },
    );

    return (
        <TableLayout tableName="Бренды" newItemUrl="/erp/brands/new">
            <Suspense fallback={<Card>Загрузка...</Card>}>
                <BrandsTable initialBrands={initialBrands} />
            </Suspense>
        </TableLayout>
    );
}
