'use client';

import { FC } from 'react';
import Link from 'next/link';
import { CategoriesIcon } from '@/components/dummies/icons/categories/CategoriesIcon';

import './CategoriesLink.styles.css';

type PropsT = {
    categoriesPageUrl: string;
};

export const CategoriesLink: FC<PropsT> = ({ categoriesPageUrl }) => (
    <Link href={categoriesPageUrl} className="header__categories-link">
        <CategoriesIcon />
        Категории
    </Link>
);
