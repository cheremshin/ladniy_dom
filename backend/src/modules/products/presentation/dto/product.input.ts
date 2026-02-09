import { InputType, Field, ID, Int, Float } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsOptional,
    IsEnum,
    Min,
    Matches,
    IsUUID,
    IsArray,
    ValidateNested,
    IsBoolean,
    IsNumber,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../entities/product.entity';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class SpecificationValueInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'key is required' })
    @IsString({ message: 'key must be a string' })
    key: string;

    @Field(() => GraphQLJSON)
    @IsNotEmpty({ message: 'value is required' })
    value: string | number | boolean;
}

@InputType()
export class CreateProductInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString({ message: 'title must be a string' })
    title: string;

    @Field(() => ID)
    @IsUUID(4, { message: 'categoryId must be a valid UUID' })
    categoryId: string;

    @Field(() => ID)
    @IsUUID(4, { message: 'productTypeId must be a valid UUID' })
    productTypeId: string;

    @Field(() => ID)
    @IsUUID(4, { message: 'brandId must be a valid UUID' })
    brandId: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'description must be a string' })
    description?: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString({ message: 'sku must be a string' })
    sku: string;

    @Field(() => ProductStatus, { defaultValue: ProductStatus.DRAFT })
    @IsEnum(ProductStatus, { message: 'status must be a valid product status' })
    status: ProductStatus = ProductStatus.DRAFT;

    @Field(() => Float)
    @Min(0, { message: 'basePrice must be a positive number' })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'basePrice must be a number' })
    basePrice: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @Min(0, { message: 'discountPrice must be a positive number' })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'discountPrice must be a number' },
    )
    discountPrice?: number | null;

    @Field(() => Float)
    @Min(0, { message: 'costPrice must be a positive number' })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'costPrice must be a number' })
    costPrice: number;

    @Field(() => [SpecificationValueInput], { nullable: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SpecificationValueInput)
    specifications?: SpecificationValueInput[];

    @Field(() => Int, { defaultValue: 0 })
    @Min(0, { message: 'stockQuantity must be a positive number' })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'stockQuantity must be a number' },
    )
    stockQuantity: number = 0;

    @Field(() => Boolean, { defaultValue: false })
    isFeatured: boolean = false;

    @Field(() => Int, { defaultValue: 0 })
    @Min(0, { message: 'warrantyMonths must be a positive number' })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'warrantyMonths must be a number' },
    )
    warrantyMonths: number = 0;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'metaTitle must be a string' })
    metaTitle?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'metaDescription must be a string' })
    metaDescription?: string;
}

@InputType()
export class UpdateProductInput {
    @Field(() => ID)
    @IsUUID(4, { message: 'id must be a valid UUID' })
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString({ message: 'title must be a string' })
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase with hyphens only' })
    @IsString({ message: 'slug must be a string' })
    slug?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID(4, { message: 'categoryId must be a valid UUID' })
    categoryId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID(4, { message: 'productTypeId must be a valid UUID' })
    productTypeId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID(4, { message: 'brandId must be a valid UUID' })
    brandId?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'description must be a string' })
    description?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString({ message: 'sku must be a string' })
    sku?: string;

    @Field(() => ProductStatus, { nullable: true })
    @IsOptional()
    @IsEnum(ProductStatus, { message: 'status must be a valid product status' })
    status?: ProductStatus;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @Min(0)
    basePrice?: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @Min(0)
    discountPrice?: number | null;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @Min(0)
    costPrice?: number;

    @Field(() => [SpecificationValueInput], { nullable: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SpecificationValueInput)
    specifications?: SpecificationValueInput[];

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @Min(0)
    stockQuantity?: number;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    isFeatured?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @Min(0)
    warrantyMonths?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    metaTitle?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    metaDescription?: string;
}

@InputType()
export class AttachImageInput {
    @Field(() => ID)
    @IsUUID(4, { message: 'productId must be a valid UUID' })
    productId: string;

    @Field()
    @IsString({ message: 'url must be a string' })
    @IsNotEmpty()
    url: string;

    @Field(() => String, { nullable: true })
    @IsString({ message: 'altText must be a string' })
    @IsOptional()
    altText?: string;

    @Field(() => Int, { defaultValue: 0 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'sortOrder must be a number' })
    @Min(0, { message: 'sortOrder must be a positive number' })
    sortOrder: number = 0;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean({ message: 'isPrimary must be a boolean' })
    isPrimary: boolean = false;
}
