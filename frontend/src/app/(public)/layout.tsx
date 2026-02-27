import { ShopProviders } from './shop-providers';
import { getUserCart, getUserFavourites } from '@/server';
import { Footer } from '@/components/widgets/footer';

export default async function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
    const [favourites, cart] = await Promise.all([
        getUserFavourites(),
        getUserCart(),
    ]);

    const favouritesIds = favourites?.items.map(item => item.productId) ?? [];
    const cartItems = cart?.items.map((item) => ({ productId: item.productId, quantity: item.quantity })) ?? [];

    return (
        <ShopProviders favourites={favouritesIds} cart={cartItems}>
            {children}
            <Footer />
        </ShopProviders>
    );
}
