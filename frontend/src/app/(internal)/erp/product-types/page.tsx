'use client';

import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { ProductTypesPageProvider } from './_lib';
import { CategorySelect } from './_components/category.select';
import { ProductTypesTable } from './_components/product-types.table';
import { CreateProductTypeTrigger } from './_components/create-product-type-trigger';
import { CreateProductTypeModal } from './_components/create-product-type-modal';

export default function Page() {
    return (
        <ProductTypesPageProvider>
            <TableLayout>
                <TableLayout.Header title="Типы продуктов">
                    <CreateProductTypeTrigger />
                </TableLayout.Header>
                <CategorySelect />
                <ProductTypesTable />
                <CreateProductTypeModal />
            </TableLayout>
        </ProductTypesPageProvider>
    );
}
