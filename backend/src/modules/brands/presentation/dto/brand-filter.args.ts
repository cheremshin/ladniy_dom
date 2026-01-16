import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class BrandFilterArgs {
    @Field({ nullable: true, description: 'Фильтр на удаленные элементы' })
    includeInactive?: boolean;

    @Field({ nullable: true, description: 'Поиск по названию' })
    search?: string;
}
