import { FavouritesQuery } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { FAVOURITES } from '@/shared/api/graphql/queries';

export async function getUserFavourites() {
    try {
        const data = await graphqlFetch<FavouritesQuery>(FAVOURITES);
        return data.favourites;
    } catch {
        return null;
    }
}
