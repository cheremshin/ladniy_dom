import { gql } from '@apollo/client';

export const TOGGLE_FAVOURITE = gql`
    mutation ToggleUserFavourite($userId: ID, $productId: ID!) {
        toggleUserFavourite(userId: $userId, productId: $productId) {
            id
            userId
            productId
        }
    }
`;

export const ADD_TO_CART = gql`
    mutation AddToCart($userId: ID, $productId: ID!) {
        addToCart(userId: $userId, productId: $productId) {
            id
            userId
            productId
            quantity
        }
    }
`;

export const REMOVE_FROM_CART = gql`
    mutation RemoveFromCart($userId: ID, $productId: ID!) {
        removeFromCart(userId: $userId, productId: $productId) {
            id
            userId
            productId
            quantity
        }
    }
`;

export const DECREASE_CART_ITEM_COUNT = gql`
    mutation DecreaseCartItemCount($userId: ID, $productId: ID!) {
        decreaseCount(userId: $userId, productId: $productId) {
            id
            userId
            productId
            quantity
        }
    }
`;
