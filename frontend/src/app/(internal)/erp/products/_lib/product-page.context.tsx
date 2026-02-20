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
import type { Product } from './types';

type ProductPageContextValue = {
    categoryId: string | null;
    categoryLabel: string | null;
    productTypeId: string | null;
    productTypeLabel: string | null;
    setCategory: (id: string | null, label?: string | null) => void;
    setProductType: (id: string | null, label?: string | null) => void;
    createModal: CreateModalState;
    registerRefetch: (fn: () => Promise<void>) => void;
    updateModal: UpdateModalState<Product>;
};

const ProductPageContext = createContext<ProductPageContextValue | null>(null);

export const ProductPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [categoryLabel, setCategoryLabel] = useState<string | null>(null);
    const [productTypeId, setProductTypeId] = useState<string | null>(null);
    const [productTypeLabel, setProductTypeLabel] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updateModalItem, setUpdateModalItemState] = useState<Product | null>(null);
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

    const setCategory = useCallback((id: string | null, label?: string | null) => {
        setCategoryId(id);
        setCategoryLabel(label ?? null);
    }, []);
    const setProductType = useCallback((id: string | null, label?: string | null) => {
        setProductTypeId(id);
        setProductTypeLabel(label ?? null);
    }, []);

    return (
        <ProductPageContext.Provider
            value={{
                categoryId,
                categoryLabel,
                productTypeId,
                productTypeLabel,
                setCategory,
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
                    setUpdateModalItem: (item: Product) => setUpdateModalItemState(item),
                    isUpdateOpen,
                    openUpdate: () => setIsUpdateOpen(true),
                    closeUpdate: () => setIsUpdateOpen(false),
                    onUpdateSuccess,
                },
            }}
        >
            {children}
        </ProductPageContext.Provider>
    );
};

export function useProductPageContext() {
    const ctx = useContext(ProductPageContext);
    if (!ctx) throw new Error('useProductPageContext must be used inside ProductPageProvider');
    return ctx;
}
