import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateProductTypeInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'title is required' })
    @IsString({ message: 'title must be a string' })
    title: string;

    @Field(() => String)
    @IsNotEmpty({ message: 'plural is required' })
    @IsString({ message: 'plural must be a string' })
    plural: string;

    @Field(() => ID)
    @IsNotEmpty({ message: 'categoryId is required' })
    @IsUUID(4, { message: 'categoryId must be a valid UUID' })
    categoryId: string;
}

@InputType()
export class UpdateProductTypeInput extends PartialType(
    OmitType(CreateProductTypeInput, ['title', 'plural'] as const),
) {
    @Field(() => ID)
    @IsNotEmpty({ message: 'id is required' })
    @IsUUID(4, { message: 'id must be a valid UUID' })
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'title must be a string' })
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'plural must be a string' })
    plural?: string;
}
