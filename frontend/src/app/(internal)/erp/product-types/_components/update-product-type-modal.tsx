'use client';

import { type FC, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import { Button, FormField, FormLazySelectField, Modal } from '@/components/base';
import { usePaginatedSelect } from '../../_lib';
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
    CategoryQuery,
    CategoryQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { CATEGORIES, CATEGORY } from '@/shared/api/graphql/queries';
import { useProductTypesPageContext } from '../_lib';
import { useUpdateProductType } from '../_lib/use-update-product-type';

export const UpdateProductTypeModal: FC = () => {
    const { updateModal } = useProductTypesPageContext();
    const { updateModalItem, isUpdateOpen, closeUpdate, onUpdateSuccess } = updateModal;
    const [categoryLabel, setCategoryLabel] = useState<string | undefined>(undefined);
    const [fetchCategory] = useLazyQuery<CategoryQuery, CategoryQueryVariables>(CATEGORY);
    const { form, onSubmit, isSubmitting } = useUpdateProductType(onUpdateSuccess);
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

    useEffect(() => {
        if (!isUpdateOpen || !updateModalItem) return;
        form.setValue('id', updateModalItem.id);
        form.setValue('title', updateModalItem.title);
        form.setValue('plural', updateModalItem.plural);
        form.setValue('categoryId', updateModalItem.categoryId);
        const categoryId = updateModalItem.categoryId;
        if (categoryId) {
            fetchCategory({ variables: { id: categoryId } }).then((res) => {
                if (res.data?.category?.id === categoryId) {
                    setCategoryLabel(res.data.category.title);
                }
            });
        } else {
            const t = setTimeout(() => setCategoryLabel(undefined), 0);
            return () => clearTimeout(t);
        }
    }, [isUpdateOpen, updateModalItem, form, fetchCategory]);

    const handleClose = () => {
        form.reset();
        closeUpdate();
    };

    return (
        <Modal isOpen={isUpdateOpen} onClose={handleClose} title="Обновить тип продукта">
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <FormField name="title" control={control} label="Название *" />
                <FormField name="plural" control={control} label="Множественное число *" />
                <FormLazySelectField
                    name="categoryId"
                    control={control}
                    label="Категория *"
                    options={categorySelect.options}
                    valueLabel={categoryLabel}
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
                        {isSubmitting ? 'Обновление…' : 'Обновить'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
