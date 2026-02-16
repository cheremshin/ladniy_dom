'use client';

import { Button } from '@/components/base';
import { FC, ReactNode } from 'react';

import './TableLayout.styles.css';

type PropsT = {
    tableName: string;
    newItemUrl: string;
    children: ReactNode;
};

export const TableLayout: FC<PropsT> = ({
    tableName,
    newItemUrl,
    children,
}) => (
    <div className="table-layout">
        <div className="table-layout__header">
            <h2>{tableName}</h2>
            <Button onClick={() => (window.location.href = newItemUrl)}>
                Создать
            </Button>
        </div>
        {children}
    </div>
);
