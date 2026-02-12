import { GET_ME } from '@/shared/api/graphql/queries/profile';
import { graphqlFetch } from '../apollo/client/graphql-fetch';
import { MeQuery } from '@/shared/api/graphql/__generated__/types';

export async function getUser() {
    try {
        const data = await graphqlFetch<MeQuery>(GET_ME);
        return data.me;
    } catch {
        return null;
    }
}
