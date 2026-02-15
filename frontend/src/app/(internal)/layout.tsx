import { Sidebar } from '@/components/widgets/sidebar';

export default async function Layout({ children }: Readonly<LayoutProps<'/'>>) {
    return (
        <main>
            <Sidebar />
            {children}
        </main>
    );
}
