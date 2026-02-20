'use client';
import { FC } from 'react';
import { Button } from '@/components/base';
import { useBrandsPageContext } from '../_lib';

export const CreateBrandTrigger: FC = () => {
    const { createModal } = useBrandsPageContext();
    return <Button onClick={createModal.openCreate}>Создать</Button>;
};
