import type { Metadata } from 'next';
import { CoreProviders } from './core-providers';
import { getUser } from '@/server';

import './globals.css';
import { Header } from '@/components/widgets/header';

export const metadata: Metadata = {
    title: 'Ладный Дом - Интернет-магазин бытовой электроники',
    description: 'Интернет-магазин бытовой электроники',
};

export default async function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
    const user = await getUser();

    return (
        <html lang="ru">
            <body>
                <CoreProviders user={user}>
                    <Header user={user} />
                    {children}
                </CoreProviders>
            </body>
        </html>
    );
}
