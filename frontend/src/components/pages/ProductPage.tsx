import { ProductPageQuery } from '@/shared/api/graphql/__generated__/types';
import { mapProductToProductDetails, mapProductToProductOverview } from '@/shared/mappers/product.mapper';
import { ProductOverviewCard } from '../entities/product/productOverviewCard/server/ProductOverviewCard';

import './ProductPage.styles.css';

type PropsT = {
    product: ProductPageQuery['productBySlug'];
}

export async function ProductPage({ product }: PropsT) {
    const productOverview = mapProductToProductOverview(product);
    const productDetails = mapProductToProductDetails(product);

    console.log('[DEV: PRODUCT_BY_SLUG] PRODUCT_OVERVIEW:', productOverview);
    console.log('[DEV: PRODUCT_BY_SLUG] PRODUCT_DETAILS:',productDetails);

    return (
        <div className='product-page'>
            <div className='product-container'>
                <ProductOverviewCard product={productOverview} />
            </div>
        </div>
    );
}
