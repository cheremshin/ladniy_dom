import { Button } from '@/components/base';
import { FC } from 'react';
import { useCart } from '../model/useCart';

type PropsT = {
    productId: string;
};

export const DecreaseCountButton: FC<PropsT> = ({ productId }) => {
    const { isPending, decreaseCount } = useCart(productId);

    return (
        <Button
            disabled={isPending}
            onClick={() => decreaseCount()}
            variant="empty"
        >
            -
        </Button>
    );
};
