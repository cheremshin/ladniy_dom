'use client';

import { Id } from '@/shared/entities/common.types';
import { useIsInCart } from './cart.selectors';
import { useTransition } from 'react';
import { useCartStore } from './cart.store';
import { addToCartAction, decreaseCountAction, removeFromCartAction } from '@/server/actions/cart';

export function useCart(productId: Id) {
    const isInCart = useIsInCart(productId);
    const [isPending, startTransition] = useTransition();

    const addToCart = () => {
        useCartStore.getState().addToCart(productId);

        startTransition(async () => {
            try {
                await addToCartAction(productId);
            } catch {
                useCartStore.getState().removeFromCart(productId);
            }
        });
    };

    const decreaseCount = () => {
        useCartStore.getState().decreaseCount(productId);

        startTransition(async () => {
            try {
                await decreaseCountAction(productId);
            } catch {
                useCartStore.getState().addToCart(productId);
            }
        });
    };

    const removeFromCart = () => {
        startTransition(async () => {
            try {
                await removeFromCartAction(productId);
                useCartStore.getState().removeFromCart(productId);
            } catch {
                useCartStore.getState().addToCart(productId);
            }
        });
    };

    return {
        isInCart,
        isPending,
        addToCart,
        decreaseCount,
        removeFromCart,
    };
}
