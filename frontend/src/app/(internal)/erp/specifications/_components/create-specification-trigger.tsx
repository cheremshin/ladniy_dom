'use client';

import { type FC } from 'react';
import { Button } from '@/components/base';
import { useSpecificationsPageContext } from '../_lib';

export const CreateSpecificationTrigger: FC = () => {
    const { createModal } = useSpecificationsPageContext();
    return <Button onClick={createModal.openCreate}>Создать</Button>;
};
