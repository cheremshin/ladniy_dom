import { InputType, Field, ID, Int, PartialType, OmitType } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsOptional,
    Min,
    Matches,
    IsBoolean,
    IsUUID,
    IsInt,
    IsString,
} from 'class-validator';

@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'title is required' })
    @IsString({ message: 'title must be a string' })
    title: string;

    @Field(() => ID, { nullable: true })
    @IsOptional({ message: 'parentId is optional' })
    @IsUUID(4, { message: 'parentId must be a valid UUID' })
    parentId?: string;

    @Field(() => String, { nullable: true })
    @IsOptional({ message: 'imageUrl is optional' })
    @IsString({ message: 'imageUrl must be a string' })
    imageUrl?: string;

    @Field(() => Int, { defaultValue: 0 })
    @Min(0, { message: 'sortOrder must be greater than or equal to 0' })
    @IsInt({ message: 'sortOrder must be an integer' })
    sortOrder: number = 0;

    @Field(() => Boolean, { defaultValue: true })
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive: boolean = true;
}

@InputType()
export class UpdateCategoryInput extends PartialType(
    OmitType(CreateCategoryInput, ['title'] as const),
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
    @IsString({ message: 'slug must be a string' })
    @Matches(/^[a-z0-9-]+$/, { message: 'slug must be lowercase with hyphens only' })
    slug?: string;
}
