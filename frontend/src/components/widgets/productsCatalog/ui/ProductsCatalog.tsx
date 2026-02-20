import { ProductsListView } from './components/ProductsListView';
import { ProductsGridView } from './components/ProductsGridView';
import { LayoutType } from '../model/types';
import { ProductPreview } from '@/shared/entities/product.types';
import { CatalogProductType } from '@/shared/entities/product-type.types';
import { CatalogHeader } from './components/CatalogHeader';

type PropsT = {
    productType: CatalogProductType;
    totalProductsCount: number;
    products: ProductPreview[];
    layout: LayoutType;
};

export async function ProductsCatalog({
    productType,
    totalProductsCount,
    products,
    layout,
}: PropsT) {
    const productPageBaseUrl = `/product`;

    return (
        <div className="products-catalog">
            <CatalogHeader productType={productType} totalProductsCount={totalProductsCount} />
            {layout === 'list' ? (
                <ProductsListView products={products} productPageBaseUrl={productPageBaseUrl} />
            ) : (
                <ProductsGridView products={products} productPageBaseUrl={productPageBaseUrl} />
            )}
        </div>
    );
}
