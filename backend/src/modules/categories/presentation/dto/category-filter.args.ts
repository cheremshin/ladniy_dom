import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationArgs } from '@/common/presentation/dto/pagination.args';

@ArgsType()
export class CategoryFilterArgs extends PaginationArgs {
    @Field(() => ID, { nullable: true, description: 'Фильтр по родительской категории' })
    @IsOptional()
    @IsUUID()
    parentId?: string;

    @Field({ nullable: true, description: 'Фильтр на удаленные элементы' })
    @IsOptional()
    @IsBoolean()
    includeInactive?: boolean;

    @Field({ nullable: true, description: 'Поиск по названию' })
    @IsOptional()
    @IsString()
    search?: string;

    @Field({ nullable: true, description: 'Фильтр по корневым категориям' })
    @IsOptional()
    @IsBoolean()
    rootOnly?: boolean;
}
