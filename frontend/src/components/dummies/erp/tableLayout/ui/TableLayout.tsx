'use client';

import { FC, ReactNode } from 'react';

import './TableLayout.styles.css';

const Root: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="table-layout">{children}</div>
);

export const Header: FC<{ title: string; children?: ReactNode }> = ({ title, children }) => (
    <div className="table-layout__header">
        <h2>{title}</h2>
        {children}
    </div>
);

export const TableLayout = Object.assign(Root, { Header });
