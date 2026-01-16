import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class ProductTypeFilterArgs {
    @Field(() => ID, { nullable: true, description: 'Фильтр по категории' })
    categoryId?: string | null;

    @Field({ nullable: true, description: 'Фильтр на удаленные элементы' })
    includeInactive?: boolean;

    @Field({ nullable: true, description: 'Поиск по названию' })
    search?: string;
}
