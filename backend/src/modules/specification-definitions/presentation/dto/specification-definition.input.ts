import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateSpecificationDefinitionInput {
    @Field(() => ID)
    @IsNotEmpty()
    productTypeId: string;

    @Field(() => String)
    @IsNotEmpty()
    key: string;

    @Field(() => String)
    @IsNotEmpty()
    displayName: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description?: string | null;

    @Field(() => String, { nullable: true })
    @IsOptional()
    unit?: string | null;

    @Field(() => Boolean, { defaultValue: false })
    isFilterable: boolean = false;

    @Field(() => Boolean, { defaultValue: true })
    isActive: boolean = true;
}

@InputType()
export class UpdateSpecificationDefinitionInput extends PartialType(
    OmitType(CreateSpecificationDefinitionInput, ['productTypeId', 'key', 'displayName'] as const),
) {
    @Field(() => ID)
    @IsNotEmpty()
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    key?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    displayName?: string;
}
