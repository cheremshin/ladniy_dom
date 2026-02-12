import { FavouritesQuery } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { GET_USER_FAVOURITES } from '@/shared/api/graphql/queries/profile';

export async function getUserFavourites() {
    try {
        const data = await graphqlFetch<FavouritesQuery>(GET_USER_FAVOURITES);
        return data.favourites;
    } catch {
        return null;
    }
}
