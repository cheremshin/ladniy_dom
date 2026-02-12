'use server';

import { AddToCartMutation, DecreaseCartItemCountMutation, RemoveFromCartMutation } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { ADD_TO_CART, DECREASE_CART_ITEM_COUNT, REMOVE_FROM_CART } from '@/shared/api/graphql/mutations/user';
import { Id } from '@/shared/entities/common.types';

/**
 * Увеличивает количество продуктов в корзине на 1, если уже есть запись, иначе, создает ее
 * @param product Идентификатор продукта
 */
export async function addToCartAction(productId: Id) {
    const result = await graphqlFetch<AddToCartMutation>(ADD_TO_CART, { productId });
    return result;
}

export async function decreaseCountAction(productId: Id) {
    const result = await graphqlFetch<DecreaseCartItemCountMutation>(DECREASE_CART_ITEM_COUNT, { productId });
    return result;
}

export async function removeFromCartAction(productId: Id) {
    const result = await graphqlFetch<RemoveFromCartMutation>(REMOVE_FROM_CART, { productId });
    return result;
}
