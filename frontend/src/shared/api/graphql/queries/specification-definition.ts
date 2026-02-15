import { gql } from '@apollo/client';
import {
    SPECIFICATION_DEFINITION_FIELDS,
    PAGINATION_META_FIELDS,
} from '../fragments';

export const SPECIFICATION_DEFINITIONS = gql`
    ${SPECIFICATION_DEFINITION_FIELDS}
    ${PAGINATION_META_FIELDS}
    query SpecificationDefinitions(
        $page: Int
        $limit: Int
        $productTypeId: ID
        $includeInactive: Boolean
        $search: String
        $displayNameSearch: String
    ) {
        specificationDefinitions(
            page: $page
            limit: $limit
            productTypeId: $productTypeId
            includeInactive: $includeInactive
            search: $search
            displayNameSearch: $displayNameSearch
        ) {
            items {
                ...SpecificationDefinitionFields
            }
            meta {
                ...PaginationMetaFields
            }
        }
    }
`;

export const SPECIFICATION_DEFINITION = gql`
    ${SPECIFICATION_DEFINITION_FIELDS}
    query SpecificationDefinition($id: ID!) {
        specificationDefinition(id: $id) {
            ...SpecificationDefinitionFields
        }
    }
`;
