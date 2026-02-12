import { CartQuery } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { GET_USER_CART } from '@/shared/api/graphql/queries/profile';

export async function getUserCart() {
    try {
        const data = await graphqlFetch<CartQuery>(GET_USER_CART);
        return data.cart;
    } catch {
        return null;
    }
}
