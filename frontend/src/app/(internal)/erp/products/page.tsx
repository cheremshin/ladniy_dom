'use client';

import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { ProductsTable } from './_components/products.table';
import { ProductPageProvider } from './_lib';
import { CategorySelect } from './_components/category.select';
import { ProductTypeSelect } from './_components/product-type.select';
import { CreateProductTrigger } from './_components/create-product-trigger';
import { CreateProductModal } from './_components/create-product-modal';

export default function Page() {
    return (
        <ProductPageProvider>
            <TableLayout>
                <TableLayout.Header title="Продукты">
                    <CreateProductTrigger />
                </TableLayout.Header>
                <CategorySelect />
                <ProductTypeSelect />
                <ProductsTable />
                <CreateProductModal />
            </TableLayout>
        </ProductPageProvider>
    );
}
