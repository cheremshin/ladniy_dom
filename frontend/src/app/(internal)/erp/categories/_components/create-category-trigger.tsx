'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useCategoriesPageContext } from '../_lib';

export const CreateCategoryTrigger: FC = () => {
    const { openCreate } = useCategoriesPageContext();
    return <Button onClick={openCreate}>Создать</Button>;
};
