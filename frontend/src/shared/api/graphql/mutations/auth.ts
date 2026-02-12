import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input)
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

export const REGISTER = gql`
    mutation Register($input: RegisterUserInputPublic!) {
        register(input: $input) {
            id
            email
            firstName
            lastName
            nickname
            phone
        }
    }
`;
