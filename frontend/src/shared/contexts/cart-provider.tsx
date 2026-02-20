'use client';

import { ReactNode, useRef } from 'react';
import { useCartStore } from '@/components/features/cart/model/cart.store';
import { Id } from '../entities/common.types';

type PropsT = {
    initialCart: { productId: Id; quantity: number }[];
    children: ReactNode;
};

export function CartProvider({ initialCart, children }: PropsT) {
    const hydrated = useRef(false);

    if (!hydrated.current) {
        const map = new Map<string, number>();

        for (const item of initialCart) {
            map.set(item.productId, item.quantity);
        }

        useCartStore.setState({ cartItems: map });

        hydrated.current = true;
    }

    return <>{children}</>;
}
