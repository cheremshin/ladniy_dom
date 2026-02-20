import { getCatalogProducts } from '@/server/queries/products';
import { mapProductToProductPreview } from '@/shared/mappers/product.mapper';
import { ProductsListView } from '@/components/widgets/productsCatalog/ui/components/ProductsListView';

import './page.styles.css';

const SEARCH_PAGE_SIZE = 24;

type SearchPageProps = {
    searchParams: Promise<{ q?: string; search?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolved = await searchParams;
    const query = resolved.q ?? resolved.search ?? '';

    const productsDTO = query.trim() ? await getCatalogProducts({
        search: query.trim(),
        page: 1,
        limit: SEARCH_PAGE_SIZE,
    }) : null;

    const products = productsDTO?.items.map((item) => mapProductToProductPreview(item)) ?? [];
    const total = productsDTO?.meta.total ?? 0;

    return (
        <main className="search-page">
            <div className="search-page__header">
                <h1 className="search-page__title">
                    {query.trim()
                        ? (total > 0
                                ? `Результаты по запросу «${query}» (${total})`
                                : 'Результаты поиска')
                        : 'Поиск'}
                </h1>
                {query.trim() && total === 0 && (
                    <p className="search-page__empty">
                        {`По запросу «${query}» ничего не найдено.`}
                    </p>
                )}
            </div>
            {products.length > 0 && (
                <ProductsListView
                    products={products}
                    productPageBaseUrl="/product"
                />
            )}
        </main>
    );
}
