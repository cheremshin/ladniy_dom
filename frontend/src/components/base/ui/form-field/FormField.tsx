'use client';

import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { Input } from '../input/Input';

type PropsT<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
    label: string;
    type?: string;
    autoComplete?: string;
    id?: string;
};

export function FormField<T extends FieldValues>({
    name,
    control,
    label,
    type = 'text',
    autoComplete,
    id,
    ...controllerProps
}: PropsT<T>) {
    const fieldId = id ?? name;
    return (
        <Controller
            name={name}
            control={control}
            {...controllerProps}
            render={({ field, fieldState }) => (
                <Input
                    id={fieldId}
                    label={label}
                    type={type}
                    autoComplete={autoComplete}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error?.message}
                    touched={!!fieldState.isTouched}
                />
            )}
        />
    );
}
