import { InputType, Field, ID, Int, PartialType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Min, Matches } from 'class-validator';

@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    parentId?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    imageUrl?: string;

    @Field(() => Int, { defaultValue: 0 })
    @Min(0)
    sortOrder: number = 0;

    @Field(() => Boolean, { defaultValue: true })
    isActive: boolean = true;
}

@InputType()
export class UpdateCategoryInput extends PartialType(
    OmitType(CreateCategoryInput, ['title'] as const),
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
