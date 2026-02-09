import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class SpecificationDefinitionFilterArgs extends PaginationArgs {
    @Field(() => ID, { nullable: true, description: 'Фильтр по типу продукта' })
    @IsOptional()
    @IsUUID(4, { message: 'productTypeId must be a valid UUID' })
    productTypeId?: string;

    @Field(() => Boolean, { nullable: true, description: 'Фильтр на удаленные элементы' })
    @IsOptional()
    @IsBoolean({ message: 'includeInactive must be a boolean' })
    includeInactive?: boolean;

    @Field(() => String, { nullable: true, description: 'Поиск по ключу' })
    @IsOptional()
    @IsString({ message: 'search must be a string' })
    search?: string;

    @Field(() => String, { nullable: true, description: 'Поиск по названию' })
    @IsOptional()
    @IsString({ message: 'displayNameSearch must be a string' })
    displayNameSearch?: string;
}
