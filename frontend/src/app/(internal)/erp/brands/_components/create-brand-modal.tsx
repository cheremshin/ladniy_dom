'use client';

import { FC } from 'react';
import { Button, ErrorMessage, FormField, Modal } from '@/components/base';
import { useBrandsPageContext } from '../_lib';
import { useCreateBrand } from '../_lib';

export const CreateBrandModal: FC = () => {
    const { isCreateOpen, closeCreate, onCreateSuccess } = useBrandsPageContext();
    const { form, onSubmit, isSubmitting } = useCreateBrand(onCreateSuccess);

    const { control, register, formState: { errors } } = form;

    const handleClose = () => {
        form.reset();
        closeCreate();
    };

    return (
        <Modal isOpen={isCreateOpen} onClose={handleClose} title="Создать бренд">
            <form onSubmit={onSubmit}>
                <FormField name="title" control={control} label="Название *" />
                <FormField name="country" control={control} label="Страна" />
                <FormField name="website" control={control} label="Сайт" type="url" />
                <FormField name="logoUrl" control={control} label="URL логотипа" type="url" />
                <div className="base-input">
                    <label htmlFor="brand-description">Описание</label>
                    <textarea
                        id="brand-description"
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
                        {isSubmitting ? 'Создание…' : 'Создать'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
