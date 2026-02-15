import { getUserCart } from '@/server/queries/cart';
import { getUserFavourites } from '@/server/queries/favourites';
import { Providers } from './providers';

export default async function Layout({ children }: Readonly<LayoutProps<'/'>>) {
    const favourites = await getUserFavourites();
    const favouritesIds = favourites?.items.map(item => item.productId) ?? [];

    const cart = await getUserCart();
    const cartItems = cart?.items.map((item) => ({ productId: item.productId, quantity: item.quantity })) ?? [];

    return (
        <main>
            <Providers favourites={favouritesIds} cart={cartItems}>
                {children}
            </Providers>
        </main>
    );
}
