import { FC } from 'react';

import './ReviewsSummary.styles.css';

export type PropsT = {
    rating: number;
    totalReviews: number;
};

export const ReviewsSummary: FC<PropsT> = ({ rating, totalReviews }) => {
    return (
        <div className="reviews-summary">
            <div className="reviews-summary__rating">
                <span className="reviews-summary__rating-value">{rating}</span>
                <span className="reviews-summary__rating-max-value">/5</span>
            </div>
            <span className="reviews-summary__total-reviews">
                {`${totalReviews} отзывов`}
            </span>
        </div>
    );
};
