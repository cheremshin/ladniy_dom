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

type CategoriesPageContextValue = {
    isCreateOpen: boolean;
    openCreate: () => void;
    closeCreate: () => void;
    registerRefetch: (fn: () => Promise<void>) => void;
    onCreateSuccess: () => void;
};

const CategoriesPageContext = createContext<CategoriesPageContextValue | null>(null);

export const CategoriesPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
        <CategoriesPageContext.Provider
            value={{
                isCreateOpen,
                openCreate: () => setIsCreateOpen(true),
                closeCreate: () => setIsCreateOpen(false),
                registerRefetch,
                onCreateSuccess,
            }}
        >
            {children}
        </CategoriesPageContext.Provider>
    );
};

export function useCategoriesPageContext() {
    const ctx = useContext(CategoriesPageContext);
    if (!ctx) throw new Error('useCategoriesPageContext must be used inside CategoriesPageProvider');
    return ctx;
}
