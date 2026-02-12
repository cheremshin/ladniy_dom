'use client';

import { Button, Card } from '@/components/base';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

type PropsT = {
    totalPrice: string;
    totalAmount: number;
};

export const TotalCard: FC<PropsT> = ({ totalPrice, totalAmount }) => {
    const router = useRouter();

    const handleOnClick = () => {
        router.push('/checkout');
    };

    return (
        <Card className="total-container">
            <h1>Итого</h1>
            <div className="total-container__summary">
                <span>{`${totalAmount} товаров`}</span>
                <span>{totalPrice}</span>
            </div>
            <Button onClick={handleOnClick}>К оформлению</Button>
        </Card>
    );
};
