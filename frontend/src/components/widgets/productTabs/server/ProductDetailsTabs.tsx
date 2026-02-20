import { ProductDescription } from '@/components/entities/product/productDescription';
import { ProductDetailsTabsView } from '../ui/ProductDetailsTabsView';
import { ProductDetails } from '@/shared/entities/product.types';

type PropsT = {
    product: ProductDetails;
};

export async function ProductDetailsTabs({ product }: PropsT) {
    return (
        <ProductDetailsTabsView
            defaultTabId="description"
            items={[
                {
                    id: 'description',
                    label: 'Описание',
                    content: (
                        <ProductDescription
                            description={product.description ?? ''}
                            specifications={product.specifications ?? []}
                        />
                    ),
                },
                {
                    id: 'reviews',
                    label: 'Отзывы',
                    content: <div>Отзывы</div>,
                },
            ]}
        />
    );
}
