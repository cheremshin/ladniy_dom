'use client';

import { type FC, useEffect } from 'react';
import { Button, FormField, FormLazySelectField, Modal } from '@/components/base';
import { usePaginatedSelect, useImageUpload, ImageUploadField } from '../../_lib';
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { CATEGORIES } from '@/shared/api/graphql/queries';
import { mapImageUrlValueToRealUrl } from '@/shared/mappers/image-url.mapper';
import { useCategoriesPageContext } from '../_lib';
import { useUpdateCategory } from '../_lib/use-update-category';

export const UpdateCategoryModal: FC = () => {
    const { updateModal } = useCategoriesPageContext();
    const { updateModalItem, isUpdateOpen, closeUpdate, onUpdateSuccess } = updateModal;
    const imageUpload = useImageUpload();
    const { form, onSubmit, isSubmitting } = useUpdateCategory(onUpdateSuccess, imageUpload.fileRef);
    const { control, register } = form;

    const parentSelect = usePaginatedSelect<
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
        if (isUpdateOpen && updateModalItem) {
            form.setValue('id', updateModalItem.id);
            form.setValue('title', updateModalItem.title);
            form.setValue('parentId', updateModalItem.parentId ?? '');
            form.setValue('sortOrder', updateModalItem.sortOrder);
            form.setValue('imageUrl', updateModalItem.imageUrl ?? '');
            form.setValue('isActive', updateModalItem.isActive);
        }
    }, [isUpdateOpen, updateModalItem, form]);

    const handleClose = () => {
        form.reset();
        imageUpload.reset();
        closeUpdate();
    };

    const existingImageUrl = updateModalItem?.imageUrl
        ? mapImageUrlValueToRealUrl(updateModalItem.imageUrl)
        : null;

    return (
        <Modal isOpen={isUpdateOpen} onClose={handleClose} title="Обновить категорию">
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <FormField name="title" control={control} label="Название *" />
                <FormLazySelectField
                    name="parentId"
                    control={control}
                    label="Родительская категория"
                    options={parentSelect.options}
                    valueLabel={updateModalItem?.parent?.title}
                    onOpen={parentSelect.onOpen}
                    onLoadMore={parentSelect.handleLoadMore}
                    hasNextPage={parentSelect.hasNextPage}
                    isLoadingMore={parentSelect.isLoading}
                    placeholder="Без родителя (корневая)"
                />
                <FormField name="sortOrder" control={control} label="Порядок сортировки" type="number" />
                <FormField name="imageUrl" control={control} label="URL изображения (или загрузите новый файл)" type="url" />
                <ImageUploadField
                    previewUrl={imageUpload.previewUrl}
                    existingImageUrl={existingImageUrl}
                    onFileChange={imageUpload.handleFileChange}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="checkbox" {...register('isActive')} />
                    Активна
                </label>
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
