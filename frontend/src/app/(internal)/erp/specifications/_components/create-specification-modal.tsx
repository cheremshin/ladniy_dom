'use client';

import { type FC, useEffect } from 'react';
import { Button, FormField, FormLazySelectField, Modal } from '@/components/base';
import { usePaginatedSelect } from '../../_lib';
import type {
    ProductTypesQuery,
    ProductTypesQueryVariables,
} from '@/shared/api/graphql/__generated__/types';
import { PRODUCT_TYPES } from '@/shared/api/graphql/queries';
import { useSpecificationsPageContext } from '../_lib';
import { useCreateSpecification } from '../_lib/use-create-specification';

export const CreateSpecificationModal: FC = () => {
    const { isCreateOpen, closeCreate, onCreateSuccess, productTypeId } = useSpecificationsPageContext();
    const { form, onSubmit, isSubmitting } = useCreateSpecification(onCreateSuccess);
    const { control, register } = form;

    const productTypeSelect = usePaginatedSelect<
        ProductTypesQuery,
        ProductTypesQuery['productTypes']['items'][number],
        ProductTypesQueryVariables
    >({
        query: PRODUCT_TYPES,
        selectCollection: (data) => data.productTypes,
        mapItem: (item) => ({ id: item.id, label: item.title }),
        variables: { limit: 15 },
    });

    // Предзаполняем тип продукта из фильтра страницы
    useEffect(() => {
        if (isCreateOpen && productTypeId) {
            form.setValue('productTypeId', productTypeId);
        }
    }, [isCreateOpen, productTypeId, form]);

    const handleClose = () => {
        form.reset();
        closeCreate();
    };

    return (
        <Modal isOpen={isCreateOpen} onClose={handleClose} title="Создать спецификацию">
            <form onSubmit={onSubmit}>
                <FormField name="displayName" control={control} label="Название *" />
                <FormField name="key" control={control} label="Ключ *" />

                <FormLazySelectField
                    name="productTypeId"
                    control={control}
                    label="Тип продукта *"
                    options={productTypeSelect.options}
                    onOpen={productTypeSelect.onOpen}
                    onLoadMore={productTypeSelect.handleLoadMore}
                    hasNextPage={productTypeSelect.hasNextPage}
                    isLoadingMore={productTypeSelect.isLoading}
                    placeholder="Выберите тип продукта"
                />

                <FormField name="unit" control={control} label="Единица измерения" />
                <FormField name="description" control={control} label="Описание" />

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="checkbox" {...register('isFilterable')} />
                    Используется в фильтрах
                </label>

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
