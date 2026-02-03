import { ProductsListView } from '@/components/widgets/productsCatalog/ui/ProductsListView';
import { getCatalogProducts } from '@/server/actions/products';
import { mapProductToProductPreview } from '@/shared/mappers/product.mapper';

export default async function Home() {
    const data = await getCatalogProducts({ page: 1, limit: 12 });
    const products = data?.products?.items.map((item) => mapProductToProductPreview(item)) ?? [];
    const meta = data?.products?.meta;
    
    return (
        <main>
            <div style={{ marginTop: '40px' }}>
                <ProductsListView products={products} productPageBaseUrl='/product' />
            </div>
            {meta && (
                <p>
                    Страница {meta.page} из {meta.totalPages}, всего {meta.total}
                </p>
            )}
        </main>
    );
}
