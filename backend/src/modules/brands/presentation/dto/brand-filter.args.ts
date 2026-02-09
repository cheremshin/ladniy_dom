import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class BrandFilterArgs extends PaginationArgs {
    @Field(() => Boolean, { nullable: true, description: 'Фильтр на удаленные элементы' })
    @IsOptional()
    @IsBoolean({ message: 'includeInactive must be a boolean' })
    includeInactive?: boolean;

    @Field(() => String, { nullable: true, description: 'Поиск по названию' })
    @IsOptional()
    @IsString({ message: 'search must be a string' })
    search?: string;
}
