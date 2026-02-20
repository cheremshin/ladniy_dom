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
import type { Brand } from './types';

type BrandsPageContextValue = {
    createModal: CreateModalState;
    registerRefetch: (fn: () => Promise<void>) => void;
    updateModal: UpdateModalState<Brand>;
};

const BrandsPageContext = createContext<BrandsPageContextValue | null>(null);

export const BrandsPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updateModalItem, setUpdateModalItemState] = useState<Brand | null>(null);
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
        <BrandsPageContext.Provider
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
                    setUpdateModalItem: (item: Brand) => setUpdateModalItemState(item),
                    isUpdateOpen,
                    openUpdate: () => setIsUpdateOpen(true),
                    closeUpdate: () => setIsUpdateOpen(false),
                    onUpdateSuccess,
                },
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
