import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class BrandFilterArgs extends PaginationArgs {
    @Field({ nullable: true, description: 'Фильтр на удаленные элементы' })
    @IsOptional()
    @IsBoolean()
    includeInactive?: boolean;

    @Field({ nullable: true, description: 'Поиск по названию' })
    @IsOptional()
    @IsString()
    search?: string;
}
