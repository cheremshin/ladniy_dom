import { ProductSpecification } from '@/shared/entities/product.types';

import './ProductDescription.styles.css';

type PropsT = {
    description: string;
    specifications: ProductSpecification;
};

export async function ProductDescription({ description, specifications }: PropsT) {
    return (
        <div className="product-description">
            <div className="product-description__text">
                {description.length > 0 ? description : 'Описание отсутствует'}
            </div>
            <div className="product-description__specifications">
                <div className="product-description__title">Характеристики</div>
                <div className="product-description__specifications-grid">
                    {specifications.map((specification) => (
                        <span className="product-description__specification-item" key={specification.key}>
                            <span className="product-description__specification-key">{`${specification.displayName}:`}</span>
                            <span className="product-description__specification-value-separator"></span>
                            <span className="product-description__specification-value">{`${specification.value} ${specification.unit}`}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
