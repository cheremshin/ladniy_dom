import { Id } from '@/shared/entities/common.types';
import { useCartStore } from './cart.store';

export const useCartItems = () =>
    useCartStore((state) => state.cartItems);

export const useCartItemCount = (id: Id) =>
    useCartStore((state) => state.cartItems.get(id));

export const useTotalItems = () =>
    useCartStore((state) => Array.from(state.cartItems.values()).reduce((prev, curr) => prev + curr, 0));

export const useIsInCart = (id: Id) =>
    useCartStore((state) => state.cartItems.has(id));
