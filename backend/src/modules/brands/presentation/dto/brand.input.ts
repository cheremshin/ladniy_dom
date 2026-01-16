import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUrl, Matches } from 'class-validator';

@InputType()
export class CreateBrandInput {
    @Field()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsNotEmpty()
    @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase with hyphens only' })
    slug: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    logoUrl?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    country?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    website?: string;

    @Field(() => Boolean, { defaultValue: true })
    isActive: boolean = true;
}

@InputType()
export class UpdateBrandInput extends PartialType(
    OmitType(CreateBrandInput, ['title', 'slug'] as const),
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
