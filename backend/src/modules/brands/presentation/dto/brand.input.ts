import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Matches,
} from 'class-validator';

@InputType()
export class CreateBrandInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'title is required' })
    @IsString({ message: 'title must be a string' })
    title: string;

    @Field(() => String, { nullable: true })
    @IsOptional({ message: 'description is optional' })
    @IsString({ message: 'description must be a string' })
    description?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'logoUrl must be a string' })
    logoUrl?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'country must be a string' })
    country?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    website?: string;

    @Field(() => Boolean, { defaultValue: true })
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive: boolean = true;
}

@InputType()
export class UpdateBrandInput extends PartialType(OmitType(CreateBrandInput, ['title'] as const)) {
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
    @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase with hyphens only' })
    slug?: string;
}
