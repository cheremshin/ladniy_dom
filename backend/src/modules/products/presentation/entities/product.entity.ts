import { Field, ID, Int, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

export enum ProductStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    OUT_OF_STOCK = 'out_of_stock',
    DISCOUNTED = 'discounted',
}

registerEnumType(ProductStatus, { name: 'ProductStatus' });

@ObjectType()
export class ProductImage {
    @Field(() => ID)
    id: string;

    @Field()
    url: string;

    @Field(() => String, { nullable: true })
    altText: string | null;

    @Field(() => Int)
    sortOrder: number;

    @Field()
    isPrimary: boolean;

    @Field()
    createdAt: Date;
}

@ObjectType()
export class Product {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    slug: string;

    @Field(() => ID)
    categoryId: string;

    @Field(() => ID, { nullable: true })
    productTypeId: string | null;

    @Field(() => ID)
    brandId: string;

    @Field(() => String, { nullable: true })
    description: string | null;

    @Field()
    sku: string;

    @Field(() => ProductStatus)
    status: ProductStatus;

    @Field(() => Float)
    basePrice: number;

    @Field(() => Float, { nullable: true })
    discountPrice: number | null;

    @Field(() => Float)
    costPrice: number;

    @Field(() => GraphQLJSON, { nullable: true })
    specifications: Record<string, unknown> | null;

    @Field(() => Int)
    stockQuantity: number;

    @Field()
    isFeatured: boolean;

    @Field(() => Int)
    warrantyMonths: number;

    @Field(() => String, { nullable: true })
    metaTitle: string | null;

    @Field(() => String, { nullable: true })
    metaDescription: string | null;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => Date, { nullable: true })
    deletedAt: Date | null;

    @Field(() => ProductImage, { nullable: true })
    primaryImage?: ProductImage | null;

    @Field(() => [ProductImage], { nullable: true })
    images?: ProductImage[] | null;
}
