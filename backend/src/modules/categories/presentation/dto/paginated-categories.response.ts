import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { PaginationMeta } from '@/common/presentation/dto/pagination.meta';

@ObjectType()
export class PaginatedCategories {
    @Field(() => [Category])
    items: Category[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
