'use client';

import { ProductCardView } from '@/components/entities/product/ui/ProductCard/ProductCardView';
import { ProductPreview } from '@/shared/entities/product.types';
import { FC } from 'react';

import './ProductsListView.styles.css';

type PropsT = {
    products: ProductPreview[];
    productPageBaseUrl: string;
};

export const ProductsListView: FC<PropsT> = ({ products, productPageBaseUrl }) => (
    <div className='products-list-view'>
        {products.map((product) => (
            <ProductCardView
                key={product.id}
                {...product}
                productPageUrl={`${productPageBaseUrl}/${product.slug}`}
                buyButtonLabel='В корзину'
                onBuyButtonClick={() => console.log(product.slug)}
                onFavouriteButtonClick={() => console.log(product.slug)}
                isFavourite={false}
            />
        ))}
    </div>
);
