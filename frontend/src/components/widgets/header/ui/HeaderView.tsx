'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';

import './HeaderView.styles.css';

type PropsT = {
    children?: ReactNode;
};

export const HeaderView: FC<PropsT> = ({ children }) => {
    return (
        <header>
            <Link href="/" className="header__logo">
                Ладный дом
            </Link>
            <div className="header__actions">
                {children}
            </div>
        </header>
    );
};
