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
import { mapImageUrlValueToRealUrl } from '@/shared/mappers/image-url.mapper';
import { useProductPageContext } from '../_lib';
import { useUpdateProduct } from '../_lib/use-update-product';
import { STATUS_OPTIONS } from '../_lib/constants';

export const UpdateProductModal: FC = () => {
    const { updateModal } = useProductPageContext();
    const { updateModalItem, isUpdateOpen, closeUpdate, onUpdateSuccess } = updateModal;
    const imageUpload = useImageUpload();
    const { form, onSubmit, isSubmitting } = useUpdateProduct(onUpdateSuccess, imageUpload.fileRef);
    const { control, register, watch } = form;

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
        if (isUpdateOpen && updateModalItem) {
            form.setValue('id', updateModalItem.id);
            form.setValue('title', updateModalItem.title);
            form.setValue('sku', updateModalItem.sku);
            form.setValue('categoryId', updateModalItem.categoryId);
            form.setValue('productTypeId', updateModalItem.productTypeId ?? '');
            form.setValue('brandId', updateModalItem.brandId);
            form.setValue('basePrice', updateModalItem.basePrice);
            form.setValue('costPrice', updateModalItem.costPrice);
            form.setValue('discountPrice', updateModalItem.discountPrice ?? 0);
            form.setValue('stockQuantity', updateModalItem.stockQuantity);
            form.setValue('warrantyMonths', updateModalItem.warrantyMonths ?? 0);
            form.setValue('status', updateModalItem.status as 'ACTIVE' | 'DISCOUNTED' | 'DRAFT' | 'OUT_OF_STOCK');
            form.setValue('description', updateModalItem.description ?? '');
            form.setValue('isFeatured', updateModalItem.isFeatured);
            form.setValue('metaTitle', updateModalItem.metaTitle ?? '');
            form.setValue('metaDescription', updateModalItem.metaDescription ?? '');
        }
    }, [isUpdateOpen, updateModalItem, form]);

    const handleClose = () => {
        form.reset();
        imageUpload.reset();
        closeUpdate();
    };

    const existingImageUrl = updateModalItem?.primaryImage?.url
        ? mapImageUrlValueToRealUrl(updateModalItem.primaryImage.url)
        : null;

    return (
        <Modal isOpen={isUpdateOpen} onClose={handleClose} title="Обновить продукт">
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <FormField name="title" control={control} label="Название *" />
                <FormField name="sku" control={control} label="Артикул *" />

                <FormLazySelectField
                    name="categoryId"
                    control={control}
                    label="Категория *"
                    options={categorySelect.options}
                    valueLabel={updateModalItem?.category?.title}
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
                    valueLabel={updateModalItem?.productType?.title}
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
                    valueLabel={updateModalItem?.brand?.title}
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
                    <label htmlFor="product-status-update">Статус</label>
                    <select
                        id="product-status-update"
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: 'inherit', width: '100%' }}
                        {...register('status')}
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="base-input">
                    <label htmlFor="product-description-update">Описание</label>
                    <textarea
                        id="product-description-update"
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
                    existingImageUrl={existingImageUrl}
                    onFileChange={imageUpload.handleFileChange}
                    label="Изображение продукта"
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
