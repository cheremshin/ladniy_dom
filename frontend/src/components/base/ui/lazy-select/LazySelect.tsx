'use client';

import { FC, useCallback, useId, useRef, useState } from 'react';

import './LazySelect.styles.css';

export type LazySelectOption = {
    id: string;
    label: string;
};

type LazySelectProps = {
    options: LazySelectOption[];
    value: string;
    onChange: (id: string) => void;
    onLoadMore?: () => void;
    hasNextPage?: boolean;
    isLoadingMore?: boolean;
    placeholder?: string;
    label?: string;
    id?: string;
};

export const LazySelect: FC<LazySelectProps> = ({
    options,
    value,
    onChange,
    onLoadMore,
    hasNextPage = false,
    isLoadingMore = false,
    placeholder = 'Все',
    label,
    id: idProp,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.id === value);
    const displayLabel = value ? (selectedOption?.label ?? value) : placeholder;

    const handleListScroll = useCallback(() => {
        const el = listRef.current;
        if (!el || !onLoadMore || !hasNextPage || isLoadingMore) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            onLoadMore();
        }
    }, [onLoadMore, hasNextPage, isLoadingMore]);

    const handleSelect = useCallback(
        (id: string) => {
            onChange(id);
            setIsOpen(false);
        },
        [onChange],
    );

    const generatedId = useId();
    const controlId = idProp ?? generatedId;

    return (
        <div className="lazy-select">
            {label && (
                <label htmlFor={controlId} className="lazy-select__label">
                    {label}
                </label>
            )}
            <div className="lazy-select__trigger-wrapper">
                <button
                    id={controlId}
                    type="button"
                    className="lazy-select__trigger"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    {displayLabel}
                </button>
                {isOpen && (
                    <>
                        <div
                            className="lazy-select__backdrop"
                            onClick={() => setIsOpen(false)}
                            aria-hidden
                        />
                        <div
                            ref={listRef}
                            className="lazy-select__list"
                            role="listbox"
                            onScroll={handleListScroll}
                        >
                            <button
                                type="button"
                                className="lazy-select__option"
                                role="option"
                                aria-selected={!value}
                                onClick={() => handleSelect('')}
                            >
                                {placeholder}
                            </button>
                            {options.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    className="lazy-select__option"
                                    role="option"
                                    aria-selected={value === opt.id}
                                    onClick={() => handleSelect(opt.id)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                            {hasNextPage && (
                                <div className="lazy-select__load-more">
                                    {isLoadingMore ? 'Загрузка…' : ''}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
