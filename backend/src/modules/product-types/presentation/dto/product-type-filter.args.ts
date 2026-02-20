import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationArgs } from '@/common/presentation/dto/pagination.args';

@ArgsType()
export class ProductTypeFilterArgs extends PaginationArgs {
    @Field(() => ID, { nullable: true, description: 'Фильтр по категории' })
    @IsOptional()
    @IsUUID(4, { message: 'categoryId must be a valid UUID' })
    categoryId?: string;

    @Field(() => Boolean, { nullable: true, description: 'Фильтр на удаленные элементы' })
    @IsOptional()
    @IsBoolean({ message: 'includeInactive must be a boolean' })
    includeInactive?: boolean;

    @Field(() => String, { nullable: true, description: 'Поиск по названию' })
    @IsOptional()
    @IsString({ message: 'search must be a string' })
    search?: string;
}
