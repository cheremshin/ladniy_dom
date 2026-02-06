import { FC } from 'react';
import clsx from 'clsx';

import './CategoryCard.styles.css';

type PropsT = {
    title: string;
    imageUrl: string | null;
    className?: string;
};

export const CategoryCard: FC<PropsT> = ({
    title,
    imageUrl,
    className,
}) => {
    return (
        <div className={clsx('category-card', className)}>
            <div className="category-card__overlay"></div>
            <div className="category-card__cover">
                {imageUrl ? (
                    <img src={imageUrl} />
                ) : (
                    <div className="category-card__cover-fallback"></div>
                )}
            </div>
            <span className="category-card__title">
                {title}
            </span>
        </div>
    );
};
