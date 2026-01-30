import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

@InputType()
export class CreateProductTypeInput {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    categoryId?: string | null;
}

@InputType()
export class UpdateProductTypeInput extends PartialType(
    OmitType(CreateProductTypeInput, ['title'] as const),
) {
    @Field(() => ID)
    @IsNotEmpty()
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase with hyphens only' })
    slug?: string;
}
