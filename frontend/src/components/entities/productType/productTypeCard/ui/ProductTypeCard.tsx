import { FC } from 'react';

import './ProductTypeCard.styles.css';

type PropsT = {
    title: string;
};

export const ProductTypeCard: FC<PropsT> = ({ title }) => {
    return (
        <div className="product-type-card">
            {title}
        </div>
    );
};
