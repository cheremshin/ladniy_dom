'use client';

import { type FC, useEffect } from 'react';
import { Button, ErrorMessage, FormField, Modal } from '@/components/base';
import { useBrandsPageContext } from '../_lib';
import { useUpdateBrand } from '../_lib/use-update-brand';

export const UpdateBrandModal: FC = () => {
    const { updateModal } = useBrandsPageContext();
    const { updateModalItem, isUpdateOpen, closeUpdate, onUpdateSuccess } = updateModal;
    const { form, onSubmit, isSubmitting } = useUpdateBrand(onUpdateSuccess);
    const { control, register, formState: { errors } } = form;

    useEffect(() => {
        if (isUpdateOpen && updateModalItem) {
            form.setValue('id', updateModalItem.id);
            form.setValue('title', updateModalItem.title);
            form.setValue('country', updateModalItem.country ?? '');
            form.setValue('website', updateModalItem.website ?? '');
            form.setValue('logoUrl', updateModalItem.logoUrl ?? '');
            form.setValue('description', updateModalItem.description ?? '');
            form.setValue('isActive', updateModalItem.isActive);
        }
    }, [isUpdateOpen, updateModalItem, form]);

    const handleClose = () => {
        form.reset();
        closeUpdate();
    };

    return (
        <Modal isOpen={isUpdateOpen} onClose={handleClose} title="Обновить бренд">
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <FormField name="title" control={control} label="Название *" />
                <FormField name="country" control={control} label="Страна" />
                <FormField name="website" control={control} label="Сайт" type="url" />
                <FormField name="logoUrl" control={control} label="URL логотипа" type="url" />
                <div className="base-input">
                    <label htmlFor="brand-description-update">Описание</label>
                    <textarea
                        id="brand-description-update"
                        rows={3}
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: 'inherit', resize: 'vertical' }}
                        {...register('description')}
                    />
                    {errors.description && <ErrorMessage error={errors.description.message!} />}
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="checkbox" {...register('isActive')} />
                    Активен
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
