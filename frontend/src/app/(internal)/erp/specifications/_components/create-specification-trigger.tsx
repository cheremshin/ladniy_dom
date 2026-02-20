'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useSpecificationsPageContext } from '../_lib';

export const CreateSpecificationTrigger: FC = () => {
    const { openCreate } = useSpecificationsPageContext();
    return <Button onClick={openCreate}>Создать</Button>;
};
