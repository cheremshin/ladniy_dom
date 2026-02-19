import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { ProductTypesPageProvider } from './_lib';
import { CategorySelect } from './_components/category.select';
import { ProductTypesTable } from './_components/product-types.table';

export default function Page() {
    return (
        <TableLayout tableName="Типы продуктов" newItemUrl="/erp/product-types/new">
            <ProductTypesPageProvider>
                <CategorySelect />
                <ProductTypesTable />
            </ProductTypesPageProvider>
        </TableLayout>
    );
}
