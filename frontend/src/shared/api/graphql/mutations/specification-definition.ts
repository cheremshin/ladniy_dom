import { gql } from '@apollo/client';
import { SPECIFICATION_DEFINITION_FIELDS } from '../fragments';

export const CREATE_SPECIFICATION_DEFINITION = gql`
    ${SPECIFICATION_DEFINITION_FIELDS}
    mutation CreateSpecificationDefinition($input: CreateSpecificationDefinitionInput!) {
        createSpecificationDefinition(input: $input) {
            ...SpecificationDefinitionFields
        }
    }
`;

export const UPDATE_SPECIFICATION_DEFINITION = gql`
    ${SPECIFICATION_DEFINITION_FIELDS}
    mutation UpdateSpecificationDefinition($input: UpdateSpecificationDefinitionInput!) {
        updateSpecificationDefinition(input: $input) {
            ...SpecificationDefinitionFields
        }
    }
`;

export const HARD_DELETE_SPECIFICATION_DEFINITION = gql`
    ${SPECIFICATION_DEFINITION_FIELDS}
    mutation HardDeleteSpecificationDefinition($id: ID!) {
        hardDeleteSpecificationDefinition(id: $id) {
            ...SpecificationDefinitionFields
        }
    }
`;

export const SOFT_DELETE_SPECIFICATION_DEFINITION = gql`
    ${SPECIFICATION_DEFINITION_FIELDS}
    mutation SoftDeleteSpecificationDefinition($id: ID!) {
        softDeleteSpecificationDefinition(id: $id) {
            ...SpecificationDefinitionFields
        }
    }
`;

export const RESTORE_SPECIFICATION_DEFINITION = gql`
    ${SPECIFICATION_DEFINITION_FIELDS}
    mutation RestoreSpecificationDefinition($id: ID!) {
        restoreSpecificationDefinition(id: $id) {
            ...SpecificationDefinitionFields
        }
    }
`;
