import { Id, Slug } from './common.types';
import { type ProductTypesQuery } from '../api/graphql/__generated__/types';

export type ProductTypeDTO = ProductTypesQuery['productTypes']['items'][number];

export type ProductTypeBase = Readonly<{
    id: Id;
    slug: Slug;
    title: string;
}>;

export type CatalogProductType = Readonly<{
    id: Id;
    plural: string;
}>;
