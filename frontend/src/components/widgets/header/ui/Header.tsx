import { Suspense } from 'react';
import { CategoriesLink } from './components/CategoriesLink';
import { HeaderView } from './HeaderView';
import { ProductsSearch } from '@/components/features/productsSearch';

export function Header() {
    return (
        <HeaderView>
            <CategoriesLink categoriesPageUrl="/catalog" />
            <Suspense>
                <ProductsSearch />
            </Suspense>
        </HeaderView>
    );
}
