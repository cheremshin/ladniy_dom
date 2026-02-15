export type SidebarItem = {
    key: string;
    label: string;
    href: string;
};

export const sidebarConfig: SidebarItem[] = [
    { key: 'dashboard', label: 'Главная', href: '/erp/dashboard' },
    { key: 'products', label: 'Продукты', href: '/erp/products' },
    { key: 'specifications', label: 'Спецификации продуктов', href: '/erp/specifications' },
    { key: 'categories', label: 'Категории', href: '/erp/categories' },
    { key: 'product-types', label: 'Типы продуктов', href: '/erp/product-types' },
    { key: 'brands', label: 'Бренды', href: '/erp/brands' },
];

export const sidebarBaseRoute = sidebarConfig[0];
