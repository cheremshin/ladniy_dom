import { CatalogProductType } from '@/shared/entities/product-type.types';
import { FC } from 'react';

import './CatalogHeader.styles.css';

type PropsT = {
    productType: CatalogProductType;
    totalProductsCount: number;
};

export const CatalogHeader: FC<PropsT> = ({ productType, totalProductsCount }) => {
    return (
        <div className="products-catalog__header">
            <div className="products-catalog__header-left">
                <h2>
                    {productType.plural}
                </h2>
                <p>
                    {`(${totalProductsCount})`}
                </p>
            </div>
        </div>
    );
};
