import { TableLayout } from '@/components/dummies/erp/tableLayout';
import { Card } from '@/components/base';
import { graphqlFetch } from '@/server/apollo/client/graphql-fetch';
import type {
    CatalogProductsQuery,
    CatalogProductsQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { PRODUCTS } from '@/shared/api/graphql/queries';
import { Suspense } from 'react';

import { ProductsTable } from './_components/products.table';
import { PRODUCTS_PAGE_SIZE } from './_lib/constants';

export default async function Page() {
    const initialProducts = await graphqlFetch<
        CatalogProductsQuery,
        CatalogProductsQueryVariables
    >(PRODUCTS, {
        page: 1,
        limit: PRODUCTS_PAGE_SIZE,
        includeDeleted: true,
    });

    return (
        <TableLayout tableName="Продукты" newItemUrl="/erp/products/new">
            <Suspense fallback={<Card>Загрузка...</Card>}>
                <ProductsTable initialProducts={initialProducts} />
            </Suspense>
        </TableLayout>
    );
}
