'use client';

import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { LazySelect, type LazySelectOption } from '../lazy-select/LazySelect';
import { ErrorMessage } from '../error-message/ErrorMessage';

type Props<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
    label: string;
    options: LazySelectOption[];
    // Подпись для текущего value, когда опции ещё не загружены
    valueLabel?: string;
    placeholder?: string;
    onOpen?: () => void;
    onLoadMore?: () => void;
    hasNextPage?: boolean;
    isLoadingMore?: boolean;
};

export function FormLazySelectField<T extends FieldValues>({
    name,
    control,
    label,
    options,
    valueLabel,
    placeholder,
    onOpen,
    onLoadMore,
    hasNextPage,
    isLoadingMore,
    ...controllerProps
}: Props<T>) {
    return (
        <Controller
            name={name}
            control={control}
            {...controllerProps}
            render={({ field, fieldState }) => (
                <div className="base-input">
                    <label>{label}</label>
                    <LazySelect
                        options={options}
                        value={field.value ?? ''}
                        valueLabel={valueLabel}
                        onChange={(id, label) => field.onChange(id || null, label || null)}
                        onOpen={onOpen}
                        onLoadMore={onLoadMore}
                        hasNextPage={hasNextPage}
                        isLoadingMore={isLoadingMore}
                        placeholder={placeholder ?? 'Выберите...'}
                    />
                    {fieldState.error && (
                        <ErrorMessage error={fieldState.error.message!} />
                    )}
                </div>
            )}
        />
    );
}
