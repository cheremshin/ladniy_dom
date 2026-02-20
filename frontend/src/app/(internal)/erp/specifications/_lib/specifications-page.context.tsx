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

type SpecificationsPageContextValue = {
    categoryId: string | null;
    productTypeId: string | null;
    setCategory: (id: string | null) => void;
    setProductType: (id: string | null) => void;
    isCreateOpen: boolean;
    openCreate: () => void;
    closeCreate: () => void;
    registerRefetch: (fn: () => Promise<void>) => void;
    onCreateSuccess: () => void;
};

const SpecificationsPageContext = createContext<SpecificationsPageContextValue | null>(null);

export const SpecificationsPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [productTypeId, setProductTypeId] = useState<string | null>(null);
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
        <SpecificationsPageContext.Provider
            value={{
                categoryId,
                productTypeId,
                setCategory: setCategoryId,
                setProductType: setProductTypeId,
                isCreateOpen,
                openCreate: () => setIsCreateOpen(true),
                closeCreate: () => setIsCreateOpen(false),
                registerRefetch,
                onCreateSuccess,
            }}
        >
            {children}
        </SpecificationsPageContext.Provider>
    );
};

export function useSpecificationsPageContext() {
    const ctx = useContext(SpecificationsPageContext);
    if (!ctx) throw new Error('useSpecificationsPageContext must be used inside SpecificationsPageProvider');
    return ctx;
}
