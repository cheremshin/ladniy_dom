import { gql } from '@apollo/client';
import {
    USER_FIELDS,
    USER_FAVOURITE_FIELDS,
    USER_CART_ITEM_FIELDS,
} from '../fragments';

export const CREATE_USER = gql`
    ${USER_FIELDS}
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            ...UserFields
        }
    }
`;

export const REGISTER = gql`
    ${USER_FIELDS}
    mutation Register($input: RegisterUserInputPublic!) {
        register(input: $input) {
            ...UserFields
        }
    }
`;

export const UPDATE_USER = gql`
    ${USER_FIELDS}
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            ...UserFields
        }
    }
`;

export const UPDATE_PROFILE_INFO = gql`
    ${USER_FIELDS}
    mutation UpdateProfileInfo($input: UpdateUserInputPublic!) {
        updateProfileInfo(input: $input) {
            ...UserFields
        }
    }
`;

export const SOFT_DELETE_USER = gql`
    ${USER_FIELDS}
    mutation SoftDeleteUser($id: ID!) {
        softDeleteUser(id: $id) {
            ...UserFields
        }
    }
`;

export const RESTORE_USER = gql`
    ${USER_FIELDS}
    mutation RestoreUser($id: ID!) {
        restoreUser(id: $id) {
            ...UserFields
        }
    }
`;

export const TOGGLE_USER_FAVOURITE = gql`
    ${USER_FAVOURITE_FIELDS}
    mutation ToggleUserFavourite($userId: ID, $productId: ID!) {
        toggleUserFavourite(userId: $userId, productId: $productId) {
            ...UserFavouriteFields
        }
    }
`;

export const ADD_TO_CART = gql`
    ${USER_CART_ITEM_FIELDS}
    mutation AddToCart($userId: ID, $productId: ID!) {
        addToCart(userId: $userId, productId: $productId) {
            ...UserCartItemFields
        }
    }
`;

export const REMOVE_FROM_CART = gql`
    ${USER_CART_ITEM_FIELDS}
    mutation RemoveFromCart($userId: ID, $productId: ID!) {
        removeFromCart(userId: $userId, productId: $productId) {
            ...UserCartItemFields
        }
    }
`;

export const DECREASE_COUNT = gql`
    ${USER_CART_ITEM_FIELDS}
    mutation DecreaseCount($userId: ID, $productId: ID!) {
        decreaseCount(userId: $userId, productId: $productId) {
            ...UserCartItemFields
        }
    }
`;
