import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationArgs } from '@/common/presentation/dto/pagination.args';

@ArgsType()
export class CategoryFilterArgs extends PaginationArgs {
    @Field(() => ID, { nullable: true, description: 'Фильтр по родительской категории' })
    @IsOptional()
    @IsUUID(4, { message: 'parentId must be a valid UUID' })
    parentId?: string;

    @Field({ nullable: true, description: 'Фильтр на удаленные элементы' })
    @IsOptional()
    @IsBoolean({ message: 'includeInactive must be a boolean' })
    includeInactive?: boolean;

    @Field({ nullable: true, description: 'Поиск по названию' })
    @IsOptional()
    @IsString({ message: 'search must be a string' })
    search?: string;

    @Field({ nullable: true, description: 'Фильтр по корневым категориям' })
    @IsOptional()
    @IsBoolean({ message: 'rootOnly must be a boolean' })
    rootOnly?: boolean;
}
