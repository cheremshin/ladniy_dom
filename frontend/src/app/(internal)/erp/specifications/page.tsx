'use client';

import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { SpecificationsTable } from './_components/specifications.table';
import { SpecificationsPageProvider } from './_lib';
import { CategorySelect } from './_components/category.select';
import { ProductTypeSelect } from './_components/product-type.select';
import { CreateSpecificationTrigger } from './_components/create-specification-trigger';
import { CreateSpecificationModal } from './_components/create-specification-modal';
import { UpdateSpecificationModal } from './_components/update-specification-modal';

export default function Page() {
    return (
        <SpecificationsPageProvider>
            <TableLayout>
                <TableLayout.Header title="Спецификации продуктов">
                    <CreateSpecificationTrigger />
                </TableLayout.Header>
                <CategorySelect />
                <ProductTypeSelect />
                <SpecificationsTable />
                <CreateSpecificationModal />
                <UpdateSpecificationModal />
            </TableLayout>
        </SpecificationsPageProvider>
    );
}
