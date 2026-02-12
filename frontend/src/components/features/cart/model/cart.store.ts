import { Id } from '@/shared/entities/common.types';
import { create } from 'zustand';

type CartState = {
    cartItems: Map<Id, number>;
};

type CartStore = CartState & {
    addToCart: (id: Id) => void;
    removeFromCart: (id: Id) => void;
    decreaseCount: (id: Id) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
    cartItems: new Map(),
    addToCart: (id) =>
        set((state) => {
            const next = new Map(state.cartItems);
            const current = state.cartItems.get(id);

            if (current !== undefined) next.set(id, current + 1);
            else next.set(id, 1);

            return { cartItems: next };
        }),

    decreaseCount: (id) =>
        set((state) => {
            const next = new Map(state.cartItems);
            const current = state.cartItems.get(id);

            if (current !== undefined && current > 1) next.set(id, current - 1);
            else next.delete(id);

            return { cartItems: next };
        }),

    removeFromCart: (id) =>
        set((state) => {
            const next = new Map(state.cartItems);
            next.delete(id);
            return { cartItems: next };
        }),

    clearCart: () => set({ cartItems: new Map() }),
}));
