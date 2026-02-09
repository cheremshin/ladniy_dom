import { Id } from '@/shared/entities/common.types';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function useAddToCart() {
    const router = useRouter();

    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = (productId: Id) => {
        startTransition(async () => {
            // Add to cart logic
            if (isInCart) {
                router.push(`/cart`);
            } else {
                setIsInCart(true);
            }
        });
    };

    return {
        isInCart,
        isPending,
        handleAddToCart,
    };
}
