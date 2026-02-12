import { gql } from '@apollo/client';

export const TOGGLE_FAVOURITE = gql`
    mutation ToggleUserFavourite($userId: String, $productId: String!) {
        toggleUserFavourite(userId: $userId, productId: $productId) {
            id
            userId
            productId
        }
    }
`;
