'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useProductPageContext } from '../_lib';

export const CreateProductTrigger: FC = () => {
    const { openCreate } = useProductPageContext();
    return <Button onClick={openCreate}>Создать</Button>;
};
