import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateSpecificationDefinitionInput {
    @Field(() => ID)
    @IsNotEmpty({ message: 'productTypeId is required' })
    @IsUUID(4, { message: 'productTypeId must be a valid UUID' })
    productTypeId: string;

    @Field(() => String)
    @IsNotEmpty({ message: 'key is required' })
    @IsString({ message: 'key must be a string' })
    key: string;

    @Field(() => String)
    @IsNotEmpty({ message: 'displayName is required' })
    @IsString({ message: 'displayName must be a string' })
    displayName: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'description must be a string' })
    description?: string | null;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'unit must be a string' })
    unit?: string | null;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean({ message: 'isFilterable must be a boolean' })
    isFilterable: boolean = false;

    @Field(() => Boolean, { defaultValue: true })
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive: boolean = true;
}

@InputType()
export class UpdateSpecificationDefinitionInput extends PartialType(
    OmitType(CreateSpecificationDefinitionInput, ['productTypeId', 'key', 'displayName'] as const),
) {
    @Field(() => ID)
    @IsNotEmpty({ message: 'id is required' })
    @IsUUID(4, { message: 'id must be a valid UUID' })
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'key must be a string' })
    key?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'displayName must be a string' })
    displayName?: string;
}
