import React, { FC } from 'react';
import clsx from 'clsx';

import './IconButton.styles.css';

type PropsT = React.ComponentProps<'button'> & {
    variant?: 'default' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
};

export const IconButton: FC<PropsT> = ({
    className,
    children,
    variant = 'default',
    size = 'md',
    ...props
}) => (
    <button
        className={clsx(
            'icon-button',
            `icon-button-${variant}`,
            `icon-button-${size}`,
            className,
        )}
        type="button"
        {...props}
    >
        {children}
    </button>
);
