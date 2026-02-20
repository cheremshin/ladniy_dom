'use client';

import { ButtonLink } from '@/components/base';
import { CartIcon } from '@/components/dummies/icons';
import { useTotalItems } from '@/components/features/cart/model/cart.selectors';
import { FC } from 'react';

type PropsT = {
    href: string;
};

export const Cart: FC<PropsT> = ({ href }) => {
    const cartItemsCount = useTotalItems();
    return <ButtonLink href={href} icon={<CartIcon />} badge={cartItemsCount} />;
};
