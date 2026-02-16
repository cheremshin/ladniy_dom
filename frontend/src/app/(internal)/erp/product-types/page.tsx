import { TableLayout } from '@/components/dummies/erp/tableLayout';
import { ProductTypesTable } from './_components/product-types.table';
import { PRODUCT_TYPES_PAGE_SIZE } from './_lib/constants';
import { graphqlFetch } from '@/server/apollo/client/graphql-fetch';
import type { ProductTypesQuery, ProductTypesQueryVariables } from '@/shared/api/graphql/__generated__/types';
import { PRODUCT_TYPES } from '@/shared/api/graphql/queries';
import { Suspense } from 'react';
import { Card } from '@/components/base';

export default async function Page() {
    const initialProductTypes = await graphqlFetch<
        ProductTypesQuery,
        ProductTypesQueryVariables
    >(PRODUCT_TYPES, {
        page: 1,
        limit: PRODUCT_TYPES_PAGE_SIZE,
        includeInactive: true,
    });

    return (
        <TableLayout tableName="Типы продуктов" newItemUrl="/erp/product-types/new">
            <Suspense fallback={<Card>Загрузка...</Card>}>
                <ProductTypesTable initialProductTypes={initialProductTypes} />
            </Suspense>
        </TableLayout>
    );
}
