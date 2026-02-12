import { Button } from '@/components/base';
import { FC } from 'react';
import { useCart } from '../model/useCart';
import { useCartItemCount } from '../model/cart.selectors';

type PropsT = {
    productId: string;
    amountAvailable: number;
};

export const IncreaseCountButton: FC<PropsT> = ({ productId, amountAvailable }) => {
    const { isPending, addToCart } = useCart(productId);
    const currentAmount = useCartItemCount(productId)!;

    const handleOnClick = () => {
        if (currentAmount >= amountAvailable) return;

        addToCart();
    };

    return (
        <Button
            disabled={isPending || currentAmount >= amountAvailable}
            onClick={handleOnClick}
            variant="empty"
        >
            +
        </Button>
    );
};
