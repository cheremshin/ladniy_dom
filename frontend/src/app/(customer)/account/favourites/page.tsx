import { ProductsListView } from '@/components/widgets/productsCatalog/ui/components/ProductsListView';
import { getUserFavourites } from '@/server/queries/favourites';
import { getProductsByIds } from '@/server/queries/products';
import { mapProductToProductPreview } from '@/shared/mappers/product.mapper';

import './page.styles.css';

export default async function Page() {
    const favourites = await getUserFavourites();
    const productsDTO = await getProductsByIds(favourites ?? []);
    const products = productsDTO.map((item) => mapProductToProductPreview(item));
    const productPageBaseUrl = `/product`;

    return (
        <main className="favourites-page">
            <h1>Избранное</h1>
            <ProductsListView products={products} productPageBaseUrl={productPageBaseUrl} />
        </main>
    );
}
