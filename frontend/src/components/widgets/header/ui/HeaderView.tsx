'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';

import './HeaderView.styles.css';

type PropsT = {
    mainPageUrl: string;
    children?: ReactNode;
};

export const HeaderView: FC<PropsT> = ({ mainPageUrl, children }) => {
    return (
        <header>
            <Link href={mainPageUrl} className="header__logo">
                Ладный дом
            </Link>
            <div className="header__actions">
                {children}
            </div>
        </header>
    );
};
