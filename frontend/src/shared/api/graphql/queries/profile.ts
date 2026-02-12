import { gql } from '@apollo/client';

export const USER_PROFILE = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            email
            firstName
            lastName
            nickname
            phone
            role
        }
    }
`;

export const GET_ME = gql`
    query Me {
        me {
            id
            email
            firstName
            lastName
            nickname
            phone
            role
        }
    }
`;

export const GET_USER_FAVOURITES = gql`
    query Favourites {
        favourites {
            items {
                productId
            }
        }
    }
`;

export const GET_USER_CART = gql`
    query Cart {
        cart {
            items {
                productId
                quantity
            }
        }
    }
`;
