'use client';
import { FC } from 'react';
import { Button } from '@/components/base';
import { useBrandsPageContext } from '../_lib';

export const CreateBrandTrigger: FC = () => {
    const { openCreate } = useBrandsPageContext();
    return <Button onClick={openCreate}>Создать</Button>;
};
