'use server';

import { Id } from '@/shared/entities/common.types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { TOGGLE_FAVOURITE } from '@/shared/api/graphql/mutations/user';

export async function toggleFavouriteAction(productId: Id) {
    await graphqlFetch(TOGGLE_FAVOURITE, { productId });
    return { success: true };
}
