import { getUserCart } from '@/server/queries/cart';
import { getProductsByIds } from '@/server/queries/products';
import { mapProductToProductPreview } from '@/shared/mappers/product.mapper';
import { CartWidget } from '@/components/widgets/cart';

import './page.styles.css';

export default async function Page() {
    const cart = await getUserCart();

    const ids = cart?.items.map((item) => item.productId) ?? [];
    const productsDTO = await getProductsByIds(ids);

    const products = productsDTO.map((item) => mapProductToProductPreview(item));

    return (
        <main className="cart-page">
            <h1>Корзина</h1>
            <CartWidget initialProducts={products} />
        </main>
    );
}
