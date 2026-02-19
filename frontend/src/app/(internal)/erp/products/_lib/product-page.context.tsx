'use client';

import { createContext, FC, ReactNode, useContext, useState } from 'react';

type ProductPageContextValue = {
    categoryId: string | null;
    productTypeId: string | null;
    setCategory: (id: string | null) => void;
    setProductType: (id: string | null) => void;
};

const ProductPageContext = createContext<ProductPageContextValue | null>(null);

export const ProductPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [productTypeId, setProductTypeId] = useState<string | null>(null);

    return (
        <ProductPageContext.Provider
            value={{
                categoryId,
                productTypeId,
                setCategory: setCategoryId,
                setProductType: setProductTypeId,
            }}
        >
            {children}
        </ProductPageContext.Provider>
    );
};

export function useProductPageContext() {
    const ctx = useContext(ProductPageContext);
    if (!ctx) {
        throw new Error('useProductPageContext must be used inside ProductPageProvider');
    }
    return ctx;
}
