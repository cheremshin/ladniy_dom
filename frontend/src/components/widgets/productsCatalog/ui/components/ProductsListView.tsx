import { ProductCard } from '@/components/entities/product/productCard/ui/ProductCard';
import { ProductPreview } from '@/shared/entities/product.types';
import { ProductActions } from '@/components/widgets/productActions';

import './ProductsListView.styles.css';

type PropsT = {
    products: ProductPreview[];
    productPageBaseUrl: string;
};

export function ProductsListView({ products, productPageBaseUrl }: PropsT) {
    return (
        <div className="products-list-view">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    productPageUrl={`${productPageBaseUrl}/${product.slug}`}
                >
                    <ProductActions
                        productId={product.id}
                        isAvailable={product.stockQuantity > 0}
                    />
                </ProductCard>
            ))}
        </div>
    );
}
