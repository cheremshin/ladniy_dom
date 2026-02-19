'use client';

import { createContext, useContext, useState, type FC, type ReactNode } from 'react';

type ProductTypesPageContextValue = {
    categoryId: string | null;
    setCategory: (id: string | null) => void;
};

const ProductTypesPageContext = createContext<ProductTypesPageContextValue | null>(null);

export const ProductTypesPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);

    return (
        <ProductTypesPageContext.Provider
            value={{
                categoryId,
                setCategory: setCategoryId,
            }}
        >
            {children}
        </ProductTypesPageContext.Provider>
    );
};

export function useProductTypesPageContext() {
    const ctx = useContext(ProductTypesPageContext);
    if (!ctx) {
        throw new Error('useProductTypesPageContext must be used inside ProductTypesPageProvider');
    }
    return ctx;
}
