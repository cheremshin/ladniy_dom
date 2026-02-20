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
    // Подпись для текущего value, когда опции ещё не загружены
    valueLabel?: string;
    onChange: (id: string, label: string) => void;
    onLoadMore?: () => void;
    onOpen?: () => void;
    hasNextPage?: boolean;
    isLoadingMore?: boolean;
    placeholder?: string;
    label?: string;
    id?: string;
};

export const LazySelect: FC<LazySelectProps> = ({
    options,
    value,
    valueLabel,
    onChange,
    onLoadMore,
    onOpen,
    hasNextPage = false,
    isLoadingMore = false,
    placeholder = 'Все',
    label,
    id: idProp,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openedOnceRef = useRef(false);
    const listRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.id === value);
    const displayLabel = value
        ? (selectedOption?.label ?? valueLabel ?? value)
        : placeholder;

    const handleListScroll = useCallback(() => {
        const el = listRef.current;
        if (!el || !onLoadMore || !hasNextPage || isLoadingMore) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            onLoadMore();
        }
    }, [onLoadMore, hasNextPage, isLoadingMore]);

    const handleOpen = useCallback(() => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next && !openedOnceRef.current) {
                openedOnceRef.current = true;
                onOpen?.();
            }
            return next;
        });
    }, [onOpen]);

    const handleSelect = useCallback(
        (id: string) => {
            const opt = options.find((o) => o.id === id);
            onChange(id, opt?.label ?? '');
            setIsOpen(false);
        },
        [onChange, options],
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
                    onClick={handleOpen}
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
