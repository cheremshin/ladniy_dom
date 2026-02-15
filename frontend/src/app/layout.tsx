import { Providers } from './providers';
import type { Metadata } from 'next';
import { Header } from '@/components/widgets/header';
import { getUser } from '@/server/queries/users';

import './globals.css';

export const metadata: Metadata = {
    title: 'Ладный Дом - Интернет-магазин бытовой электроники',
    description: 'Интернет-магазин бытовой электроники',
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
    const user = await getUser();

    return (
        <html lang="ru">
            <body>
                <Providers user={user}>
                    <Header user={user} />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
