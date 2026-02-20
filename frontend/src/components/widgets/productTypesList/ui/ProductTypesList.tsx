import { ProductTypeCard } from '@/components/entities/productType/productTypeCard/ui/ProductTypeCard';
import { CatalogProductType } from '@/shared/entities/product-type.types';

import './ProductTypesList.styles.css';
import { ProductTypeListItem } from './components/ProductTypeListItem';

type PropsT = {
    productTypes: CatalogProductType[];
    initialProductType: CatalogProductType;
};

export function ProductTypesList({ productTypes, initialProductType }: PropsT) {
    return (
        <div className="product-types-list">
            {productTypes.map((productType) => (
                <ProductTypeListItem key={productType.id} slug={productType.slug} isActive={productType.slug === initialProductType.slug}>
                    <ProductTypeCard title={productType.plural} />
                </ProductTypeListItem>
            ))}
        </div>
    );
}
