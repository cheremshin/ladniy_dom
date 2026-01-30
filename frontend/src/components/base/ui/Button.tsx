import React, { FC } from 'react';

import clsx from 'clsx';

import './Button.styles.css';

type PropsT = React.ComponentProps<'button'>;

export const Button: FC<PropsT> = ({
    className,
    children,
    ...props
}) => (
    <button
        className={clsx('base-button', className)}
        type='button'
        {...props}
    >
        {children}
    </button>
);
