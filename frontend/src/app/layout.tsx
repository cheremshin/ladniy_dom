import { Providers } from './providers';
import type { Metadata } from 'next';
import { getUser } from '@/server/queries/users';
import { getUserCart, getUserFavourites } from '@/server';
import { Header } from '@/components/widgets/header';

import './globals.css';

export const metadata: Metadata = {
    title: 'Ладный Дом - Интернет-магазин бытовой электроники',
    description: 'Интернет-магазин бытовой электроники',
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
    const user = await getUser();

    const [favourites, cart] = await Promise.all([
        getUserFavourites(),
        getUserCart(),
    ]);

    const favouritesIds = favourites?.items.map(item => item.productId) ?? [];
    const cartItems = cart?.items.map((item) => ({ productId: item.productId, quantity: item.quantity })) ?? [];

    return (
        <html lang="ru">
            <body>
                <Providers user={user} favourites={favouritesIds} cart={cartItems}>
                    <Header user={user} />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
