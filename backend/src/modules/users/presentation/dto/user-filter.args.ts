import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { UserRole } from '../entities/user.entity';

@ArgsType()
export class UserFilterArgs extends PaginationArgs {
    @Field(() => String, { nullable: true, description: 'Поиск по email или nickname' })
    @IsOptional()
    @IsString({ message: 'search must be a string' })
    search?: string;

    @Field(() => UserRole, { nullable: true, description: 'Фильтр по роли' })
    @IsOptional()
    role?: UserRole;

    @Field(() => Boolean, { nullable: true, description: 'Включать неактивных пользователей' })
    @IsOptional()
    @IsBoolean({ message: 'includeInactive must be a boolean' })
    includeInactive?: boolean;
}
