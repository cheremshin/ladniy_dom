import { ProductCard } from '@/components/entities/product/productCard/server/ProductCard';
import { ProductPreview } from '@/shared/entities/product.types';

import './ProductsListView.styles.css';

type PropsT = {
    products: ProductPreview[];
    productPageBaseUrl: string;
};

export async function ProductsListView({ products, productPageBaseUrl }: PropsT) {
    return (
        <div className='products-list-view'>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    productPageUrl={`${productPageBaseUrl}/${product.slug}`}
                />
            ))}
        </div>
    );
}
