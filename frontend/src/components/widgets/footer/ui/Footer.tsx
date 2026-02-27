import { FC } from 'react';

import './footer.styles.css';

export const Footer: FC = () => {
    return (
        <footer>
            <span className="footer-title-container">
                <h4>Ладный дом</h4>
                {' '}
                © 2025
            </span>
        </footer>
    );
};
