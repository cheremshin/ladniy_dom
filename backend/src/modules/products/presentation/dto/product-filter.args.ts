import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { ArgsType, Field, Float, ID } from '@nestjs/graphql';
import { ProductStatus } from '../entities/product.entity';
import { IsBoolean, IsEnum, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class ProductFilterArgs extends PaginationArgs {
    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    brandId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    productTypeId?: string;

    @Field(() => ProductStatus, { nullable: true })
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsPositive()
    minPrice?: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsPositive()
    maxPrice?: number;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    includeDeleted?: boolean;
}
