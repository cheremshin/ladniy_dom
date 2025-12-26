import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CategoryFilterArgs {
    @Field(() => ID, { nullable: true, description: 'Фильтр по родительской категории' })
    parentId?: string;

    @Field({ nullable: true, description: 'Фильтр по активности' })
    isActive?: boolean;

    @Field({ nullable: true, description: 'Поиск по названию' })
    search?: string;

    @Field({ nullable: true, description: 'Фильтр по корневым категориям' })
    rootOnly?: boolean;
}
