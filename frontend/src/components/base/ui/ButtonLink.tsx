import Link from 'next/link';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import './ButtonLink.styles.css';

type PropsT = {
    href: string;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
    variant?: 'primary';
};

export const ButtonLink: FC<PropsT> = ({
    href,
    icon,
    children,
    className,
    variant = 'primary',
}) => (
    <Link
        href={href}
        className={clsx('base-button-link', `base-button-link--${variant}`, className)}
    >
        {icon && <span className="base-button-link__icon">{icon}</span>}
        {children}
    </Link>
);
