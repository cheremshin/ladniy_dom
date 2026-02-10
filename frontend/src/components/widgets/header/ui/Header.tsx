import { Suspense } from 'react';
import { HeaderView } from './HeaderView';
import { ProductsSearch } from '@/components/features/productsSearch';
import { ButtonLink } from '@/components/base/ui/ButtonLink';
import { CategoriesIcon } from '@/components/dummies/icons';

export function Header() {
    return (
        <HeaderView>
            <ButtonLink href="/catalog">
                <CategoriesIcon />
                Категории
            </ButtonLink>
            <Suspense>
                <ProductsSearch />
            </Suspense>
        </HeaderView>
    );
}
