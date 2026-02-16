import { Sidebar } from '@/components/widgets/sidebar';

import './layout.styles.css';

export default async function Layout({ children }: Readonly<LayoutProps<'/'>>) {
    return (
        <>
            <Sidebar />
            <main className="page-layout">
                {children}
            </main>
        </>
    );
}
