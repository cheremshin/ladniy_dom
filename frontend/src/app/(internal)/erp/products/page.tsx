import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { ProductsTable } from './_components/products.table';
import { ProductPageProvider } from './_lib';
import { CategorySelect } from './_components/category.select';
import { ProductTypeSelect } from './_components/product-type.select';

export default function Page() {
    return (
        <TableLayout tableName="Продукты" newItemUrl="/erp/products/new">
            <ProductPageProvider>
                <CategorySelect />
                <ProductTypeSelect />
                <ProductsTable />
            </ProductPageProvider>
        </TableLayout>
    );
}
