import { Suspense } from 'react';
import { HeaderView } from './HeaderView';
import { ProductsSearch } from '@/components/features/productsSearch';
import { ButtonLink } from '@/components/base/ui/ButtonLink';
import { CategoriesIcon } from '@/components/dummies/icons';
import { ProfileIcon } from '@/components/dummies/icons/profile/ProfileIcon';

export async function Header() {
    return (
        <HeaderView>
            <ButtonLink href="/catalog" icon={<CategoriesIcon />} />
            <Suspense>
                <ProductsSearch />
            </Suspense>
            <ButtonLink href="/account" icon={<ProfileIcon />} />
        </HeaderView>
    );
}
