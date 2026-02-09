'use client';

import { FC } from 'react';
import { LayoutType } from '../../model/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PropsT = {
    currentLayout: LayoutType;
};

export const LayoutToggle: FC<PropsT> = ({ currentLayout }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const toggle = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('layout', currentLayout === 'list' ? 'grid' : 'list');
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <button onClick={toggle}>
            {currentLayout === 'list' ? 'Сетка' : 'Список'}
        </button>
    );
};
