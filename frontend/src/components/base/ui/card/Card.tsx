import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import './Card.styles.css';

type PropsT = {
    className?: string;
    children?: ReactNode;
};

export const Card: FC<PropsT> = ({
    className,
    children,
}) => (
    <div className={clsx('card-component', className)}>
        {children}
    </div>
);
