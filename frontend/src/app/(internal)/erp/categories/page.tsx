'use client';

import { TableLayout } from '@/components/dummies/erp/tableLayout';

import { CategoriesPageProvider } from './_lib';
import { CategoriesTable } from './_components/categories.table';
import { CreateCategoryTrigger } from './_components/create-category-trigger';
import { CreateCategoryModal } from './_components/create-category-modal';
import { UpdateCategoryModal } from './_components/update-category-modal';

export default function Page() {
    return (
        <CategoriesPageProvider>
            <TableLayout>
                <TableLayout.Header title="Категории">
                    <CreateCategoryTrigger />
                </TableLayout.Header>
                <CategoriesTable />
                <CreateCategoryModal />
                <UpdateCategoryModal />
            </TableLayout>
        </CategoriesPageProvider>
    );
}
