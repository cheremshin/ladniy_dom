import React, { FC } from 'react';

import clsx from 'clsx';

import './Button.styles.css';

type PropsT = React.ComponentProps<'button'> & {
    variant?: 'primary' | 'secondary';
};

export const Button: FC<PropsT> = ({
    className,
    children,
    variant = 'primary',
    ...props
}) => (
    <button
        className={clsx('base-button', `base-button-${variant}`, className)}
        type='button'
        {...props}
    >
        {children}
    </button>
);
