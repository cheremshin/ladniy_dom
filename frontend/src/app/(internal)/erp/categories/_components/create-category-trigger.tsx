'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useCategoriesPageContext } from '../_lib';

export const CreateCategoryTrigger: FC = () => {
    const { createModal } = useCategoriesPageContext();
    return <Button onClick={createModal.openCreate}>Создать</Button>;
};
