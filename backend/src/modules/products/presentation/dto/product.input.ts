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
    @Field()
    @IsNotEmpty()
    key: string;

    @Field(() => GraphQLJSON)
    value: string | number | boolean;
}

@InputType()
export class CreateProductInput {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => ID)
    @IsUUID()
    categoryId: string;

    @Field(() => ID)
    @IsUUID()
    productTypeId: string;

    @Field(() => ID)
    @IsUUID()
    brandId: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description?: string;

    @Field(() => String)
    @IsNotEmpty()
    sku: string;

    @Field(() => ProductStatus, { defaultValue: ProductStatus.DRAFT })
    @IsEnum(ProductStatus)
    status: ProductStatus = ProductStatus.DRAFT;

    @Field(() => Float)
    @Min(0)
    basePrice: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @Min(0)
    discountPrice?: number | null;

    @Field(() => Float)
    @Min(0)
    costPrice: number;

    @Field(() => [SpecificationValueInput], { nullable: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SpecificationValueInput)
    specifications?: SpecificationValueInput[];

    @Field(() => Int, { defaultValue: 0 })
    @Min(0)
    stockQuantity: number = 0;

    @Field(() => Boolean, { defaultValue: false })
    isFeatured: boolean = false;

    @Field(() => Int, { defaultValue: 0 })
    @Min(0)
    warrantyMonths: number = 0;

    @Field(() => String, { nullable: true })
    @IsOptional()
    metaTitle?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    metaDescription?: string;
}

@InputType()
export class UpdateProductInput {
    @Field(() => ID)
    @IsUUID()
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase with hyphens only' })
    slug?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    productTypeId?: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    brandId?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    sku?: string;

    @Field(() => ProductStatus, { nullable: true })
    @IsOptional()
    @IsEnum(ProductStatus)
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
    @IsUUID()
    productId: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    url: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    altText?: string;

    @Field(() => Int, { defaultValue: 0 })
    @IsNumber()
    @Min(0)
    sortOrder: number = 0;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isPrimary: boolean = false;
}
