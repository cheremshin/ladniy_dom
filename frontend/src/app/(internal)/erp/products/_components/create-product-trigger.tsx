'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useProductPageContext } from '../_lib';

export const CreateProductTrigger: FC = () => {
    const { createModal } = useProductPageContext();
    return <Button onClick={createModal.openCreate}>Создать</Button>;
};
