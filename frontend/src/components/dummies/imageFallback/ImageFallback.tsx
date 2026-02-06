import { FC } from 'react';

import './ImageFallback.styles.css';

export const ImageFallback: FC = () => {
    return (
        <div className='image-fallback'>
            <span>No image</span>
        </div>
    );
}