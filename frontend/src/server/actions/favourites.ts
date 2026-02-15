'use server';

import { TOGGLE_USER_FAVOURITE } from '@/shared/api/graphql/mutations/user';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import type { Id } from '@/shared/entities/common.types';

export async function toggleFavouriteAction(productId: Id) {
    await graphqlFetch(TOGGLE_USER_FAVOURITE, { productId });
    return { success: true };
}
