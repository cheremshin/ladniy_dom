import { Suspense } from 'react';
import { HeaderView } from './HeaderView';
import { ProductsSearch } from '@/components/features/productsSearch';
import { ButtonLink } from '@/components/base/';
import { CategoriesIcon } from '@/components/dummies/icons';
import { ProfileIcon } from '@/components/dummies/icons';
import { cookies } from 'next/headers';
import { Favourites } from '../_components/Favourites';
import { Cart } from '../_components/Cart';

export async function Header() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    return (
        <HeaderView>
            <ButtonLink href="/catalog" icon={<CategoriesIcon />} />
            <Suspense>
                <ProductsSearch />
            </Suspense>
            {session ? (
                <>
                    <Favourites href="/account/favourites" />
                    <Cart href="/account/cart" />
                    <ButtonLink href="/account" icon={<ProfileIcon />} />
                </>
            ) : (
                <ButtonLink href="/auth/sign-in" variant="outlined">Войти</ButtonLink>
            )}
        </HeaderView>
    );
}
