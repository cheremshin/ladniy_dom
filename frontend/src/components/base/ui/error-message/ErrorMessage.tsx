import clsx from 'clsx';
import { FC } from 'react';

import './ErrorMessage.styles.css';

type PropsT = {
    error: string;
    className?: string;
};

export const ErrorMessage: FC<PropsT> = ({ error, className }) => (
    <p className={clsx('error', className)}>{error}</p>
);
