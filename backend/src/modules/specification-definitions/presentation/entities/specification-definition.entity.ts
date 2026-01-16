import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SpecificationDefinition {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    productTypeId: string;

    @Field(() => String)
    key: string;

    @Field(() => String)
    displayName: string;

    @Field(() => String, { nullable: true })
    description: string | null;

    @Field(() => String, { nullable: true })
    unit: string | null;

    @Field(() => Boolean)
    isFilterable: boolean;

    @Field(() => Boolean)
    isActive: boolean;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
