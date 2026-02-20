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
import type { ProductType } from './types';

type ProductTypesPageContextValue = {
    categoryId: string | null;
    categoryLabel: string | null;
    setCategory: (id: string | null, label: string | null) => void;
    createModal: CreateModalState;
    updateModal: UpdateModalState<ProductType>;
    registerRefetch: (fn: () => Promise<void>) => void;
};

const ProductTypesPageContext = createContext<ProductTypesPageContextValue | null>(null);

export const ProductTypesPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [categoryLabel, setCategoryLabel] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
    const [updateModalItem, setUpdateModalItemState] = useState<ProductType | null>(null);
    const refetchRef = useRef<(() => Promise<void>) | null>(null);

    const setCategory = useCallback((id: string | null, label: string | null) => {
        setCategoryId(id);
        setCategoryLabel(label);
    }, []);

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
        <ProductTypesPageContext.Provider
            value={{
                categoryId,
                categoryLabel,
                setCategory,
                createModal: {
                    isCreateOpen,
                    openCreate: () => setIsCreateOpen(true),
                    closeCreate: () => setIsCreateOpen(false),
                    onCreateSuccess,
                },
                updateModal: {
                    updateModalItem,
                    setUpdateModalItem: (item: ProductType) => setUpdateModalItemState(item),
                    isUpdateOpen,
                    openUpdate: () => setIsUpdateOpen(true),
                    closeUpdate: () => setIsUpdateOpen(false),
                    onUpdateSuccess,
                },
                registerRefetch,
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
