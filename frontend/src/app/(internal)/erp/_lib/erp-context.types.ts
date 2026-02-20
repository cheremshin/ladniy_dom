/** Состояние модалки создания для страниц ERP */
export type CreateModalState = {
    isCreateOpen: boolean;
    openCreate: () => void;
    closeCreate: () => void;
    onCreateSuccess: () => void;
};

/** Состояние модалки обновления для страниц ERP */
export type UpdateModalState<T> = {
    updateModalItem: T | null;
    setUpdateModalItem: (item: T) => void;
    isUpdateOpen: boolean;
    openUpdate: () => void;
    closeUpdate: () => void;
    onUpdateSuccess: () => void;
};
