import { Providers } from './providers';
import type { Metadata } from 'next';
import { Header } from '@/components/entities/header/server/Header';
import './globals.css';

export const metadata: Metadata = {
    title: 'Ладный Дом - Интернет-магазин бытовой электроники',
    description: 'Интернет-магазин бытовой электроники',
};

export default function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
    return (
        <html lang="ru">
            <body>
                <Providers>
                    <Header />
                    <div className='page'>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
