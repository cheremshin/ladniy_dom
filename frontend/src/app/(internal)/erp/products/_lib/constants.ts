export const PRODUCTS_PAGE_SIZE = 20;

export const STATUS_OPTIONS = [
    { value: 'DRAFT', label: 'Черновик' },
    { value: 'ACTIVE', label: 'Активен' },
    { value: 'DISCOUNTED', label: 'Со скидкой' },
    { value: 'OUT_OF_STOCK', label: 'Нет в наличии' },
] as const;
