import { ReactNode, Suspense } from 'react';
import { HeaderView } from './HeaderView';
import { ProductsSearch } from '@/components/features/productsSearch';
import { ButtonLink } from '@/components/base/';
import { CategoriesIcon } from '@/components/dummies/icons';
import { ProfileIcon } from '@/components/dummies/icons';
import { Favourites } from '../_components/Favourites';
import { Cart } from '../_components/Cart';
import { RawUser } from '@/shared/mappers/user.mapper';

type PropsT = {
    user: RawUser;
};

type HeaderSetup = {
    mainPageUrl: string;
    showSearh: boolean;
    actions: ReactNode;
};

const MENU_ITEMS_STATES: Record<string, HeaderSetup> = {
    ADMIN: {
        mainPageUrl: '/erp/dashboard',
        showSearh: false,
        actions: <ButtonLink href="/erp/profile" icon={<ProfileIcon />} />,
    },
    CUSTOMER: {
        mainPageUrl: '/',
        showSearh: true,
        actions: (
            <>
                <Favourites href="/account/favourites" />
                <Cart href="/account/cart" />
                <ButtonLink href="/account" icon={<ProfileIcon />} />
            </>
        ),
    },
    DEFAULT: {
        mainPageUrl: '/',
        showSearh: true,
        actions: <ButtonLink href="/auth/sign-in" variant="outlined">Войти</ButtonLink>,
    },
};

export async function Header({ user }: PropsT) {
    const setup = MENU_ITEMS_STATES[user?.role ?? 'DEFAULT'];

    return (
        <HeaderView mainPageUrl={setup.mainPageUrl}>
            <ButtonLink href="/catalog" icon={<CategoriesIcon />} />
            {setup.showSearh && (
                <Suspense>
                    <ProductsSearch />
                </Suspense>
            )}
            {setup.actions}
        </HeaderView>
    );
}
