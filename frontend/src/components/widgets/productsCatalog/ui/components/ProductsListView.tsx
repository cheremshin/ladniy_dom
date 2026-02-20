import { ProductCard } from '@/components/entities/product/productCard/ui/ProductCard';
import { ProductPreview } from '@/shared/entities/product.types';
import { ProductActions } from '@/components/features/productActions';
import { CartProductActions } from '@/components/features/cartProductActions';

import './ProductsListView.styles.css';

type PropsT = {
    products: ProductPreview[];
    productPageBaseUrl: string;
    view?: 'catalog' | 'cart';
};

export function ProductsListView({ products, productPageBaseUrl, view = 'catalog' }: PropsT) {
    return (
        <div className="products-list-view">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    productPageUrl={`${productPageBaseUrl}/${product.slug}`}
                >
                    {view === 'catalog' ? (
                        <ProductActions
                            productId={product.id}
                            isAvailable={product.stockQuantity > 0}
                        />
                    ) : (
                        <CartProductActions
                            productId={product.id}
                            amountAvailable={product.stockQuantity}
                        />
                    )}
                </ProductCard>
            ))}
        </div>
    );
}
