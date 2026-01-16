import { Type } from '@nestjs/common';
import { PaginationMeta } from './pagination.meta';
import { Field, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: Type<T>): Type<{ items: T[]; meta: PaginationMeta }> {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType {
        @Field(() => [classRef])
        items: T[];

        @Field(() => PaginationMeta)
        meta: PaginationMeta;
    }

    return PaginatedType as Type<{ items: T[]; meta: PaginationMeta }>;
}
