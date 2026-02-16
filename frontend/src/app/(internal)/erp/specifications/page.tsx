import { TableLayout } from '@/components/dummies/erp/tableLayout';
import { Card } from '@/components/base';
import { graphqlFetch } from '@/server/apollo/client/graphql-fetch';
import type {
    SpecificationDefinitionsQuery,
    SpecificationDefinitionsQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { SPECIFICATION_DEFINITIONS } from '@/shared/api/graphql/queries';
import { Suspense } from 'react';

import { SpecificationsTable } from './_components/specifications.table';
import { SPECIFICATIONS_PAGE_SIZE } from './_lib/constants';

export default async function Page() {
    const initialSpecifications = await graphqlFetch<
        SpecificationDefinitionsQuery,
        SpecificationDefinitionsQueryVariables
    >(SPECIFICATION_DEFINITIONS, {
        page: 1,
        limit: SPECIFICATIONS_PAGE_SIZE,
        includeInactive: true,
    });

    return (
        <TableLayout
            tableName="Спецификации продуктов"
            newItemUrl="/erp/specifications/new"
        >
            <Suspense fallback={<Card>Загрузка...</Card>}>
                <SpecificationsTable initialSpecifications={initialSpecifications} />
            </Suspense>
        </TableLayout>
    );
}
