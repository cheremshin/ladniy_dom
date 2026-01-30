import { Id, Slug } from './common.types';

export type ProductTypeBase = Readonly<{
    id: Id;
    slug: Slug;
    title: string;
}>;
