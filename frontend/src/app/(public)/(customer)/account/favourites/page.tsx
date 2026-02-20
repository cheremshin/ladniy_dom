import { ProductsListView } from '@/components/widgets/productsCatalog/ui/components/ProductsListView';
import { getUserFavourites } from '@/server/queries/favourites';
import { getProductsByIds } from '@/server/queries/products';
import { mapProductToProductPreview } from '@/shared/mappers/product.mapper';

import './page.styles.css';
import clsx from 'clsx';
import { Card } from '@/components/base';
import Link from 'next/link';

export default async function Page() {
    const favourites = await getUserFavourites();
    const productsDTO = await getProductsByIds(favourites?.items.map((item) => item.productId) ?? []);
    const products = productsDTO.map((item) => mapProductToProductPreview(item));
    const productPageBaseUrl = `/product`;

    return (
        <main className={clsx('favourites-page', products.length === 0 ? 'empty' : '')}>
            <h1>Избранное</h1>
            {products.length > 0 ? (
                <ProductsListView products={products} productPageBaseUrl={productPageBaseUrl} />
            ) : (
                <div className="empty-favourites__container">
                    <Card className="empty-favourites">
                        <p className="empty-favourites__title">Ничего нет</p>
                        <Link href="/catalog">В каталог</Link>
                    </Card>
                </div>
            )}
        </main>
    );
}
