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
}) => {
    const isCheckboxOrRadio = type === 'checkbox' || type === 'radio';
    const inputValue = isCheckboxOrRadio ? (value ?? false) : (value ?? '');
    return (
        <div className={clsx('base-input', className)}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                value={typeof inputValue !== 'boolean' ? inputValue : undefined}
                checked={typeof inputValue === 'boolean' ? inputValue : undefined}
                onChange={onChange}
                onBlur={onBlur}
                {...rest}
            />
            {touched && error && <ErrorMessage error={error} />}
        </div>
    );
};
