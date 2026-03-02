import Image from 'next/image';

import './page.styles.css';
import { Card } from '@/components/base';
import { ProductsListView } from '@/components/widgets/productsCatalog/ui/components/ProductsListView';
import { getCatalogProducts } from '@/server';
import { mapProductToProductPreview } from '@/shared/mappers/product.mapper';

export default async function Home() {
    const featuredProducts = await getCatalogProducts({
        isFeatured: true,
        page: 1,
        limit: 4,
    });
    const products = featuredProducts?.items.map((item) => mapProductToProductPreview(item)) ?? [];

    return (
        <main className="main-page">
            <Card>
                <Image className="main-cover" src="/images/main-cover.jpg" loading="lazy" width={1280} height={853} alt="Логотип сайта" />
            </Card>
            <div className="featured-products">
                <h3>Рекомендуемые товары</h3>
                <ProductsListView products={products} productPageBaseUrl="/product" />
            </div>
        </main>
    );
}
