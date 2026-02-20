'use client';

import { type FC, useEffect } from 'react';
import { Button, FormField, FormLazySelectField, Modal } from '@/components/base';
import { usePaginatedSelect, useImageUpload, ImageUploadField } from '../../_lib';
import type {
    BrandsQuery,
    BrandsQueryVariables,
    CategoriesQuery,
    CategoriesQueryVariables,
    ProductTypesQuery,
    ProductTypesQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { BRANDS, CATEGORIES, PRODUCT_TYPES } from '@/shared/api/graphql/queries';
import { useProductPageContext } from '../_lib';
import { useCreateProduct } from '../_lib/use-create-product';
import { STATUS_OPTIONS } from '../_lib/constants';

export const CreateProductModal: FC = () => {
    const { createModal, categoryId, categoryLabel, productTypeId, productTypeLabel } = useProductPageContext();
    const { isCreateOpen, closeCreate, onCreateSuccess } = createModal;
    const imageUpload = useImageUpload();
    const { form, onSubmit, isSubmitting } = useCreateProduct(onCreateSuccess, imageUpload.fileRef);
    const { control, register, watch, setValue } = form;

    const watchedCategoryId = watch('categoryId');

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

    const productTypeSelect = usePaginatedSelect<
        ProductTypesQuery,
        ProductTypesQuery['productTypes']['items'][number],
        ProductTypesQueryVariables
    >({
        query: PRODUCT_TYPES,
        selectCollection: (data) => data.productTypes,
        mapItem: (item) => ({ id: item.id, label: item.title }),
        variables: { limit: 15, categoryId: watchedCategoryId || undefined },
    });

    const brandSelect = usePaginatedSelect<
        BrandsQuery,
        BrandsQuery['brands']['items'][number],
        BrandsQueryVariables
    >({
        query: BRANDS,
        selectCollection: (data) => data.brands,
        mapItem: (item) => ({ id: item.id, label: item.title }),
        variables: { limit: 15 },
    });

    useEffect(() => {
        if (!isCreateOpen) return;
        if (categoryId) setValue('categoryId', categoryId);
        if (productTypeId) setValue('productTypeId', productTypeId);
    }, [isCreateOpen, categoryId, productTypeId, setValue]);

    useEffect(() => {
        setValue('productTypeId', '');
    }, [watchedCategoryId, setValue]);

    const handleClose = () => {
        form.reset();
        imageUpload.reset();
        closeCreate();
    };

    return (
        <Modal isOpen={isCreateOpen} onClose={handleClose} title="Создать продукт">
            <form onSubmit={onSubmit}>
                <FormField name="title" control={control} label="Название *" />
                <FormField name="sku" control={control} label="Артикул *" />

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

                <FormLazySelectField
                    name="productTypeId"
                    control={control}
                    label="Тип продукта *"
                    options={productTypeSelect.options}
                    valueLabel={productTypeId ? (productTypeLabel ?? undefined) : undefined}
                    onOpen={productTypeSelect.onOpen}
                    onLoadMore={productTypeSelect.handleLoadMore}
                    hasNextPage={productTypeSelect.hasNextPage}
                    isLoadingMore={productTypeSelect.isLoading}
                    placeholder="Выберите тип продукта"
                />

                <FormLazySelectField
                    name="brandId"
                    control={control}
                    label="Бренд *"
                    options={brandSelect.options}
                    onOpen={brandSelect.onOpen}
                    onLoadMore={brandSelect.handleLoadMore}
                    hasNextPage={brandSelect.hasNextPage}
                    isLoadingMore={brandSelect.isLoading}
                    placeholder="Выберите бренд"
                />

                <FormField name="basePrice" control={control} label="Цена *" type="number" />
                <FormField name="costPrice" control={control} label="Себестоимость *" type="number" />
                <FormField name="discountPrice" control={control} label="Цена со скидкой" type="number" />
                <FormField name="stockQuantity" control={control} label="Остаток" type="number" />
                <FormField name="warrantyMonths" control={control} label="Гарантия (мес.)" type="number" />

                <div className="base-input">
                    <label htmlFor="product-status">Статус</label>
                    <select
                        id="product-status"
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: 'inherit', width: '100%' }}
                        {...register('status')}
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="base-input">
                    <label htmlFor="product-description">Описание</label>
                    <textarea
                        id="product-description"
                        rows={3}
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: 'inherit', resize: 'vertical' }}
                        {...register('description')}
                    />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="checkbox" {...register('isFeatured')} />
                    Рекомендуемый
                </label>

                <ImageUploadField
                    previewUrl={imageUpload.previewUrl}
                    onFileChange={imageUpload.handleFileChange}
                    label="Изображение продукта"
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
