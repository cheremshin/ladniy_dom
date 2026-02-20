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
import type { SpecificationDefinition } from './types';

type SpecificationsPageContextValue = {
    categoryId: string | null;
    productTypeId: string | null;
    productTypeLabel: string | null;
    setCategory: (id: string | null) => void;
    setProductType: (id: string | null, label?: string | null) => void;
    createModal: CreateModalState;
    registerRefetch: (fn: () => Promise<void>) => void;
    updateModal: UpdateModalState<SpecificationDefinition>;
};

const SpecificationsPageContext = createContext<SpecificationsPageContextValue | null>(null);

export const SpecificationsPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [productTypeId, setProductTypeId] = useState<string | null>(null);
    const [productTypeLabel, setProductTypeLabel] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updateModalItem, setUpdateModalItemState] = useState<SpecificationDefinition | null>(null);
    const refetchRef = useRef<(() => Promise<void>) | null>(null);

    const registerRefetch = useCallback((fn: () => Promise<void>) => {
        refetchRef.current = fn;
    }, []);

    const setProductType = useCallback((id: string | null, label?: string | null) => {
        setProductTypeId(id);
        setProductTypeLabel(label ?? null);
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
        <SpecificationsPageContext.Provider
            value={{
                categoryId,
                productTypeId,
                productTypeLabel,
                setCategory: setCategoryId,
                setProductType,
                createModal: {
                    isCreateOpen,
                    openCreate: () => setIsCreateOpen(true),
                    closeCreate: () => setIsCreateOpen(false),
                    onCreateSuccess,
                },
                registerRefetch,
                updateModal: {
                    updateModalItem,
                    setUpdateModalItem: (item: SpecificationDefinition) => setUpdateModalItemState(item),
                    isUpdateOpen,
                    openUpdate: () => setIsUpdateOpen(true),
                    closeUpdate: () => setIsUpdateOpen(false),
                    onUpdateSuccess,
                },
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
