import { ProductPreview } from '@/shared/entities/product.types'
import { ProductCardView } from '../ui/ProductCardView';
import { getPrices } from '../../model/pricing';
import { ProductCardActions } from '../ui/ProductCardActions';

export type PropsT = {
    product: ProductPreview;
    productPageUrl: string;
}

export async function ProductCard({ product, productPageUrl }: PropsT) {
    const pricing = getPrices(product.pricing);

    return (
        <ProductCardView
            title={product.title}
            pricing={pricing}
            status={product.status}
            isFeatured={product.isFeatured}
            primaryImage={product.primaryImage}
            productPageUrl={productPageUrl}
        >
            <ProductCardActions
                productId={product.id}
                isAvailable={product.stockQuantity > 0}
                initialFavouriteStatus={false}
            />
        </ProductCardView>
    );
}
