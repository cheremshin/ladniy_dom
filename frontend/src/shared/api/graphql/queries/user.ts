import { gql } from '@apollo/client';
import {
    USER_FIELDS,
    USER_FAVOURITE_FIELDS,
    USER_CART_ITEM_FIELDS,
    PAGINATION_META_FIELDS,
} from '../fragments';

export const USERS = gql`
    ${USER_FIELDS}
    ${PAGINATION_META_FIELDS}
    query Users(
        $page: Int
        $limit: Int
        $search: String
        $role: UserRole
        $includeInactive: Boolean
    ) {
        users(
            page: $page
            limit: $limit
            search: $search
            role: $role
            includeInactive: $includeInactive
        ) {
            items {
                ...UserFields
            }
            meta {
                ...PaginationMetaFields
            }
        }
    }
`;

export const USER = gql`
    ${USER_FIELDS}
    query User($id: ID!) {
        user(id: $id) {
            ...UserFields
        }
    }
`;

export const ME = gql`
    ${USER_FIELDS}
    query Me {
        me {
            ...UserFields
        }
    }
`;

export const FAVOURITES = gql`
    ${USER_FAVOURITE_FIELDS}
    query Favourites($userId: ID) {
        favourites(userId: $userId) {
            items {
                ...UserFavouriteFields
            }
        }
    }
`;

export const CART = gql`
    ${USER_CART_ITEM_FIELDS}
    query Cart($userId: ID) {
        cart(userId: $userId) {
            items {
                ...UserCartItemFields
            }
        }
    }
`;
