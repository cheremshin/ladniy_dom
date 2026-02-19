import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { BrandsTable } from './_components/brands.table';

export default function Page() {
    return (
        <TableLayout tableName="Бренды" newItemUrl="/erp/brands/new">
            <BrandsTable />
        </TableLayout>
    );
}
