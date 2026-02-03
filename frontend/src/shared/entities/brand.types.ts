import { Id, Slug } from './common.types';

export type BrandBase = Readonly<{
    id: Id;
    slug: Slug;
    title: string;
    logoUrl?: string | null;
}>;
