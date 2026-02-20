'use client';

import { type FC, useEffect } from 'react';
import { Button, FormField, FormLazySelectField, Modal } from '@/components/base';
import { usePaginatedSelect } from '../../_lib';
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { CATEGORIES } from '@/shared/api/graphql/queries';
import { useProductTypesPageContext } from '../_lib';
import { useCreateProductType } from '../_lib/use-create-product-type';

export const CreateProductTypeModal: FC = () => {
    const { categoryId, categoryLabel, createModal } = useProductTypesPageContext();
    const { isCreateOpen, closeCreate, onCreateSuccess } = createModal;
    const { form, onSubmit, isSubmitting } = useCreateProductType(onCreateSuccess);
    const { control } = form;

    const categorySelect = usePaginatedSelect<
        CategoriesQuery,
        CategoriesQuery['categories']['items'][number],
        CategoriesQueryVariables
    >({
        query: CATEGORIES,
        selectCollection: (data) => data.categories,
        mapItem: (item) => ({ id: item.id, label: item.title }),
        variables: { limit: 15 },
    });

    // Предзаполняем категорию из фильтра страницы
    useEffect(() => {
        if (isCreateOpen && categoryId) {
            form.setValue('categoryId', categoryId);
        }
    }, [isCreateOpen, categoryId, form]);

    const handleClose = () => {
        form.reset();
        closeCreate();
    };

    return (
        <Modal isOpen={isCreateOpen} onClose={handleClose} title="Создать тип продукта">
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <FormField name="title" control={control} label="Название *" />
                <FormField name="plural" control={control} label="Множественное число *" />
                <FormLazySelectField
                    name="categoryId"
                    control={control}
                    label="Категория *"
                    options={categorySelect.options}
                    valueLabel={categoryId ? (categoryLabel ?? undefined) : undefined}
                    onOpen={categorySelect.onOpen}
                    onLoadMore={categorySelect.handleLoadMore}
                    hasNextPage={categorySelect.hasNextPage}
                    isLoadingMore={categorySelect.isLoading}
                    placeholder="Выберите категорию"
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                    <Button variant="outlined" type="button" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Создание…' : 'Создать'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
