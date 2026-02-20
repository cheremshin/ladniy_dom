'use client';

import { type FC, useEffect } from 'react';
import { Button, FormField, Modal } from '@/components/base';
import { useSpecificationsPageContext } from '../_lib';
import { useUpdateSpecification } from '../_lib/use-update-specification';

export const UpdateSpecificationModal: FC = () => {
    const { updateModal } = useSpecificationsPageContext();
    const { updateModalItem, isUpdateOpen, closeUpdate, onUpdateSuccess } = updateModal;
    const { form, onSubmit, isSubmitting } = useUpdateSpecification(onUpdateSuccess);
    const { control, register } = form;

    useEffect(() => {
        if (isUpdateOpen && updateModalItem) {
            form.setValue('id', updateModalItem.id);
            form.setValue('key', updateModalItem.key);
            form.setValue('displayName', updateModalItem.displayName);
            form.setValue('description', updateModalItem.description ?? '');
            form.setValue('unit', updateModalItem.unit ?? '');
            form.setValue('isFilterable', updateModalItem.isFilterable);
            form.setValue('isActive', updateModalItem.isActive);
        }
    }, [isUpdateOpen, updateModalItem, form]);

    const handleClose = () => {
        form.reset();
        closeUpdate();
    };

    return (
        <Modal isOpen={isUpdateOpen} onClose={handleClose} title="Обновить спецификацию">
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <FormField name="displayName" control={control} label="Название *" />
                <FormField name="key" control={control} label="Ключ *" />
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
                        {isSubmitting ? 'Обновление…' : 'Обновить'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
