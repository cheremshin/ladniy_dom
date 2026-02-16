import type { SpecificationDefinitionsQuery } from '@/shared/api/graphql/__generated__/types';

export type SpecificationDefinition
    = SpecificationDefinitionsQuery['specificationDefinitions']['items'][number];

export type SpecificationsTableInitialData = SpecificationDefinitionsQuery;
