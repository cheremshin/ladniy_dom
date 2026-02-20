'use client';

import { type FC } from 'react';
import { Button, FormField, FormLazySelectField, Modal } from '@/components/base';
import { usePaginatedSelect, useImageUpload, ImageUploadField } from '../../_lib';
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { CATEGORIES } from '@/shared/api/graphql/queries';
import { useCategoriesPageContext } from '../_lib';
import { useCreateCategory } from '../_lib/use-create-category';

export const CreateCategoryModal: FC = () => {
    const { createModal } = useCategoriesPageContext();
    const { isCreateOpen, closeCreate, onCreateSuccess } = createModal;
    const imageUpload = useImageUpload();
    const { form, onSubmit, isSubmitting } = useCreateCategory(onCreateSuccess, imageUpload.fileRef);
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

    const handleClose = () => {
        form.reset();
        imageUpload.reset();
        closeCreate();
    };

    return (
        <Modal isOpen={isCreateOpen} onClose={handleClose} title="Создать категорию">
            <form onSubmit={onSubmit}>
                <FormField name="title" control={control} label="Название *" />
                <FormLazySelectField
                    name="parentId"
                    control={control}
                    label="Родительская категория"
                    options={parentSelect.options}
                    onOpen={parentSelect.onOpen}
                    onLoadMore={parentSelect.handleLoadMore}
                    hasNextPage={parentSelect.hasNextPage}
                    isLoadingMore={parentSelect.isLoading}
                    placeholder="Без родителя (корневая)"
                />
                <FormField name="sortOrder" control={control} label="Порядок сортировки" type="number" />
                <FormField name="imageUrl" control={control} label="URL изображения (или загрузите файл)" type="url" />
                <ImageUploadField
                    previewUrl={imageUpload.previewUrl}
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
                        {isSubmitting ? 'Создание…' : 'Создать'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
