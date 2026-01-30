import { Id, Slug } from './common.types';

export type CategoryBase = Readonly<{
    id: Id;
    slug: Slug;
    title: string;
}>;
