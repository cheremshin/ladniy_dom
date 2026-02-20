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

type BrandsPageContextValue = {
    isCreateOpen: boolean;
    openCreate: () => void;
    closeCreate: () => void;
    /** Таблица вызывает один раз при монтировании */
    registerRefetch: (fn: () => Promise<void>) => void;
    /** Модалка вызывает после успешного создания */
    onCreateSuccess: () => void;
};

const BrandsPageContext = createContext<BrandsPageContextValue | null>(null);

export const BrandsPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
        <BrandsPageContext.Provider
            value={{
                isCreateOpen,
                openCreate: () => setIsCreateOpen(true),
                closeCreate: () => setIsCreateOpen(false),
                registerRefetch,
                onCreateSuccess,
            }}
        >
            {children}
        </BrandsPageContext.Provider>
    );
};

export function useBrandsPageContext() {
    const ctx = useContext(BrandsPageContext);
    if (!ctx) throw new Error('useBrandsPageContext must be used inside BrandsPageProvider');
    return ctx;
}
