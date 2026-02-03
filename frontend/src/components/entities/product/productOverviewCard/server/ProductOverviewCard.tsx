import { FC } from 'react';
import { ProductOverview } from '@/shared/entities/product.types';
import { getPrices } from '../../model/pricing';
import { ProductOverviewCardView } from '../ui/ProductOverviewCardView';
import { ProductOverviewCardActions } from '../ui/ProductOverviewCardActions';

type PropsT = {
    product: ProductOverview;
}

export const ProductOverviewCard: FC<PropsT> = ({ product }) => {
    const pricing = getPrices(product.pricing);

    return (
        <ProductOverviewCardView
            title={product.title}
            sku={product.sku}
            pricing={pricing}
            status={product.status}
            images={product.images}
            brand={{
                slug: product.brand.slug,
                logoUrl: product.brand.logoUrl ?? '',
                title: product.brand.title,
            }}
            isAvailable={product.stockQuantity > 0}
        >
            <ProductOverviewCardActions
                productId={product.id}
                isAvailable={product.stockQuantity > 0}
                initialFavouriteStatus={false}
            />
        </ProductOverviewCardView>
    );
};
