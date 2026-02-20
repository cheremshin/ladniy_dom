import { ProductPreview } from '@/shared/entities/product.types';
import Link from 'next/link';

import './ProductsGridView.styles.css';

type PropsT = {
    products: ProductPreview[];
    productPageBaseUrl: string;
};

export function ProductsGridView({ products, productPageBaseUrl }: PropsT) {
    return (
        <div className="products-catalog__grid-view">
            {products.map((product) => (
                <Link
                    key={product.id}
                    href={`${productPageBaseUrl}/${product.slug}`}
                >
                    {product.title}
                </Link>
            ))}
        </div>
    );
}
