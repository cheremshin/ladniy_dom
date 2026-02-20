'use client';

import { FC } from 'react';
import { useProductsSearch } from '../model/useProductsSearch';
import { Button } from '@/components/base';
import { SearchIcon } from '@/components/dummies/icons';

import './ProductsSearch.styles.css';

export const ProductsSearch: FC = () => {
    const { query, setQuery, handleSearch } = useProductsSearch();

    return (
        <form
            className="product-search"
            role="search"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                aria-label="Поиск товаров"
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </form>
    );
};
