'use client';

import { createContext, FC, ReactNode, useContext, useState } from 'react';

type SpecificationsPageContextValue = {
    categoryId: string | null;
    productTypeId: string | null;
    setCategory: (id: string | null) => void;
    setProductType: (id: string | null) => void;
};

const SpecificationsPageContext = createContext<SpecificationsPageContextValue | null>(null);

export const SpecificationsPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [productTypeId, setProductTypeId] = useState<string | null>(null);

    return (
        <SpecificationsPageContext.Provider
            value={{
                categoryId,
                productTypeId,
                setCategory: setCategoryId,
                setProductType: setProductTypeId,
            }}
        >
            {children}
        </SpecificationsPageContext.Provider>
    );
};

export function useSpecificationsPageContext() {
    const ctx = useContext(SpecificationsPageContext);
    if (!ctx) {
        throw new Error('useSpecificationsPageContext must be used inside SpecificationsPageProvider');
    }
    return ctx;
}
