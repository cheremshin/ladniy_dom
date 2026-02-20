'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useProductTypesPageContext } from '../_lib';

export const CreateProductTypeTrigger: FC = () => {
    const { createModal } = useProductTypesPageContext();
    const { openCreate } = createModal;

    return <Button onClick={openCreate}>Создать</Button>;
};
