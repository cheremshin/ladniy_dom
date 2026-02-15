'use server';

import {
    AddToCartMutation,
    DecreaseCountMutation,
    RemoveFromCartMutation,
} from '@/shared/api/graphql/__generated__/types';
import { ADD_TO_CART, DECREASE_COUNT, REMOVE_FROM_CART } from '@/shared/api/graphql/mutations/user';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import type { Id } from '@/shared/entities/common.types';

/** Добавляет товар в корзину или увеличивает количество на 1 */
export async function addToCartAction(productId: Id) {
    const result = await graphqlFetch<AddToCartMutation>(ADD_TO_CART, { productId });
    return result;
}

/** Уменьшает количество товара в корзине на 1 */
export async function decreaseCountAction(productId: Id) {
    const result = await graphqlFetch<DecreaseCountMutation>(DECREASE_COUNT, { productId });
    return result;
}

/** Удаляет товар из корзины */
export async function removeFromCartAction(productId: Id) {
    const result = await graphqlFetch<RemoveFromCartMutation>(REMOVE_FROM_CART, { productId });
    return result;
}
