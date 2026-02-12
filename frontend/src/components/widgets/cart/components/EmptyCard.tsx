import { Card } from '@/components/base';
import Link from 'next/link';
import { FC } from 'react';

export const EmptyCard: FC = () => (
    <div className="empty-card__container">
        <Card className="empty-card">
            <p className="empty-card__title">Ничего нет</p>
            <Link href="/catalog">В каталог</Link>
        </Card>
    </div>
);
