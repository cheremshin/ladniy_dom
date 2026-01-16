import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class SpecificationDefinitionFilterArgs extends PaginationArgs {
    @Field(() => ID, { nullable: true, description: 'Фильтр по типу продукта' })
    @IsOptional()
    @IsUUID()
    productTypeId?: string;

    @Field({ nullable: true, description: 'Фильтр на удаленные элементы' })
    @IsOptional()
    @IsBoolean()
    includeInactive?: boolean;

    @Field({ nullable: true, description: 'Поиск по ключу' })
    @IsOptional()
    @IsString()
    search?: string;

    @Field({ nullable: true, description: 'Поиск по названию' })
    @IsOptional()
    @IsString()
    displayNameSearch?: string;
}
