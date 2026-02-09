import { PaginationArgs } from '@/common/presentation/dto/pagination.args';
import { ArgsType, Field, Float, ID } from '@nestjs/graphql';
import { ProductStatus } from '../entities/product.entity';
import { IsBoolean, IsEnum, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class ProductFilterArgs extends PaginationArgs {
    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID(4, { message: 'categoryId must be a valid UUID' })
    categoryId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID(4, { message: 'brandId must be a valid UUID' })
    brandId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID(4, { message: 'productTypeId must be a valid UUID' })
    productTypeId?: string;

    @Field(() => ProductStatus, { nullable: true })
    @IsOptional()
    @IsEnum(ProductStatus, { message: 'status must be a valid product status' })
    status?: ProductStatus;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean({ message: 'isFeatured must be a boolean' })
    isFeatured?: boolean;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'search must be a string' })
    search?: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsPositive({ message: 'minPrice must be a positive number' })
    minPrice?: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsPositive({ message: 'maxPrice must be a positive number' })
    maxPrice?: number;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean({ message: 'includeDeleted must be a boolean' })
    includeDeleted?: boolean;
}
