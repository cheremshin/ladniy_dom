import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { SpecificationsTable } from './_components/specifications.table';
import { SpecificationsPageProvider } from './_lib';
import { CategorySelect } from './_components/category.select';
import { ProductTypeSelect } from './_components/product-type.select';

export default function Page() {
    return (
        <TableLayout
            tableName="Спецификации продуктов"
            newItemUrl="/erp/specifications/new"
        >
            <SpecificationsPageProvider>
                <CategorySelect />
                <ProductTypeSelect />
                <SpecificationsTable />
            </SpecificationsPageProvider>
        </TableLayout>
    );
}
