import clsx from 'clsx';
import { FC, InputHTMLAttributes } from 'react';

import './Input.styles.css';
import { ErrorMessage } from '../error-message/ErrorMessage';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    touched?: boolean;
    error?: string;
};

export const Input: FC<InputProps> = ({
    label,
    id,
    name,
    type,
    autoComplete,
    value,
    onChange,
    onBlur,
    error,
    touched,
    className,
    ...rest
}) => (
    <div className={clsx('base-input', className)}>
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
        />
        {touched && error && <ErrorMessage error={error} />}
    </div>
);
