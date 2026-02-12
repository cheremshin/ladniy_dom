import { Providers } from './providers';
import type { Metadata } from 'next';
import { Header } from '@/components/widgets/header';
import { getUser } from '@/server/queries/users';
import { getUserFavourites } from '@/server/queries/favourites';

import './globals.css';

export const metadata: Metadata = {
    title: 'Ладный Дом - Интернет-магазин бытовой электроники',
    description: 'Интернет-магазин бытовой электроники',
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
    const user = await getUser();
    const favourites = await getUserFavourites();

    return (
        <html lang="ru">
            <body>
                <Providers
                    user={user}
                    favourites={favourites}
                >
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
