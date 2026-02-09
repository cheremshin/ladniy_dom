'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import './ProductTypeListItem.styles.css';

type PropsT = {
    children: React.ReactNode;
    slug: string;
    isActive: boolean;
};

export const ProductTypeListItem: FC<PropsT> = ({ children, slug, isActive }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleClick = () => {
        if (isActive) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set('productType', slug);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className={`${isActive ? 'product-types-list__item--active' : ''}`} onClick={handleClick}>
            {children}
        </div>
    );
};
