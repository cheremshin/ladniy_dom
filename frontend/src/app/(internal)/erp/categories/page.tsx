import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { CategoriesTable } from './_components/categories.table';

export default function Page() {
    return (
        <TableLayout tableName="Категории" newItemUrl="/erp/categories/new">
            <CategoriesTable />
        </TableLayout>
    );
}
