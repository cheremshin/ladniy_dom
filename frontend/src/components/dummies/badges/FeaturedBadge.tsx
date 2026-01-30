import { FC } from 'react';

import './FeaturedBadge.styles.css';

type PropsT = {
    label?: string;
}

export const FeaturedBadge: FC<PropsT> = ({ label = 'Рекомендуемый' }) => {
    return (
        <span className='featured-badge'>{label}</span>
    )
}
