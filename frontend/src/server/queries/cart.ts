import { CartQuery } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { CART } from '@/shared/api/graphql/queries';

export async function getUserCart() {
    try {
        const data = await graphqlFetch<CartQuery>(CART);
        return data.cart;
    } catch {
        return null;
    }
}
