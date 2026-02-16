import React, { FC } from 'react';
import Link from 'next/link';

interface TableLinkProps {
    href: string;
    children: React.ReactNode;
}

export const TableLink: FC<TableLinkProps> = ({ href, children }) => {
    return (
        <Link href={href} className="data-table-link">
            {children}
        </Link>
    );
};
