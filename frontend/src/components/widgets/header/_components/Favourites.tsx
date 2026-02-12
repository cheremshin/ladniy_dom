'use client';

import { ButtonLink } from '@/components/base';
import { FavouriteIcon } from '@/components/dummies/icons';
import { useTotalItems } from '@/components/features/favourite/model/favourites.selectors';
import { FC } from 'react';

type PropsT = {
    href: string;
};

export const Favourites: FC<PropsT> = ({ href }) => {
    const favouritesCount = useTotalItems();
    return <ButtonLink href={href} icon={<FavouriteIcon fillStyle="filled" />} badge={favouritesCount} />;
};
