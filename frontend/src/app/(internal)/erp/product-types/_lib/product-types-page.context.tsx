'use client';

import {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
    type FC,
    type ReactNode,
} from 'react';

type ProductTypesPageContextValue = {
    categoryId: string | null;
    setCategory: (id: string | null) => void;
    isCreateOpen: boolean;
    openCreate: () => void;
    closeCreate: () => void;
    registerRefetch: (fn: () => Promise<void>) => void;
    onCreateSuccess: () => void;
};

const ProductTypesPageContext = createContext<ProductTypesPageContextValue | null>(null);

export const ProductTypesPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const refetchRef = useRef<(() => Promise<void>) | null>(null);

    const registerRefetch = useCallback((fn: () => Promise<void>) => {
        refetchRef.current = fn;
    }, []);

    const onCreateSuccess = useCallback(async () => {
        setIsCreateOpen(false);
        await refetchRef.current?.();
    }, []);

    return (
        <ProductTypesPageContext.Provider
            value={{
                categoryId,
                setCategory: setCategoryId,
                isCreateOpen,
                openCreate: () => setIsCreateOpen(true),
                closeCreate: () => setIsCreateOpen(false),
                registerRefetch,
                onCreateSuccess,
            }}
        >
            {children}
        </ProductTypesPageContext.Provider>
    );
};

export function useProductTypesPageContext() {
    const ctx = useContext(ProductTypesPageContext);
    if (!ctx) throw new Error('useProductTypesPageContext must be used inside ProductTypesPageProvider');
    return ctx;
}
