'use client';

import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { BrandsTable } from './_components/brands.table';
import { BrandsPageProvider } from './_lib';
import { CreateBrandTrigger } from './_components/create-brand-trigger';
import { CreateBrandModal } from './_components/create-brand-modal';
import { UpdateBrandModal } from './_components/update-brand-modal';

export default function Page() {
    return (
        <BrandsPageProvider>
            <TableLayout>
                <TableLayout.Header title="Бренды">
                    <CreateBrandTrigger />
                </TableLayout.Header>
                <BrandsTable />
                <CreateBrandModal />
                <UpdateBrandModal />
            </TableLayout>
        </BrandsPageProvider>
    );
}
