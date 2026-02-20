'use client';

import { CategoryCard } from '@/components/entities/category/categoryCard';
import Link from 'next/link';
import { FC } from 'react';

import './CategoryLink.styles.css';

type PropsT = {
    href: string;
    title: string;
    imageUrl: string | null;
};

export const CategoryLink: FC<PropsT> = ({
    href,
    title,
    imageUrl,
}) => {
    return (
        <Link href={href}>
            <CategoryCard title={title} imageUrl={imageUrl} className="category-link" />
        </Link>
    );
};
