'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useProductTypesPageContext } from '../_lib';

export const CreateProductTypeTrigger: FC = () => {
    const { openCreate } = useProductTypesPageContext();
    return <Button onClick={openCreate}>Создать</Button>;
};
