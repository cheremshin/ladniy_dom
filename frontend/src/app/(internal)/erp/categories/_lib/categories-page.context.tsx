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
import type { CreateModalState, UpdateModalState } from '@/app/(internal)/erp/_lib';
import type { Category } from './types';

type CategoriesPageContextValue = {
    createModal: CreateModalState;
    registerRefetch: (fn: () => Promise<void>) => void;
    updateModal: UpdateModalState<Category>;
};

const CategoriesPageContext = createContext<CategoriesPageContextValue | null>(null);

export const CategoriesPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updateModalItem, setUpdateModalItemState] = useState<Category | null>(null);
    const refetchRef = useRef<(() => Promise<void>) | null>(null);

    const registerRefetch = useCallback((fn: () => Promise<void>) => {
        refetchRef.current = fn;
    }, []);

    const onCreateSuccess = useCallback(async () => {
        setIsCreateOpen(false);
        await refetchRef.current?.();
    }, []);

    const onUpdateSuccess = useCallback(async () => {
        setIsUpdateOpen(false);
        await refetchRef.current?.();
    }, []);

    return (
        <CategoriesPageContext.Provider
            value={{
                createModal: {
                    isCreateOpen,
                    openCreate: () => setIsCreateOpen(true),
                    closeCreate: () => setIsCreateOpen(false),
                    onCreateSuccess,
                },
                registerRefetch,
                updateModal: {
                    updateModalItem,
                    setUpdateModalItem: (item: Category) => setUpdateModalItemState(item),
                    isUpdateOpen,
                    openUpdate: () => setIsUpdateOpen(true),
                    closeUpdate: () => setIsUpdateOpen(false),
                    onUpdateSuccess,
                },
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
