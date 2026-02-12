'use client';

import { ButtonLink } from '@/components/base';
import { FavouriteIcon } from '@/components/dummies/icons';
import { useFavouriteIds } from '@/components/features/favourite/model/favourites.selectors';
import { FC } from 'react';

type PropsT = {
    href: string;
};

export const Favourites: FC<PropsT> = ({ href }) => {
    const favouritesCount = useFavouriteIds().size;

    return <ButtonLink href={href} icon={<FavouriteIcon />} badge={favouritesCount} />;
};
