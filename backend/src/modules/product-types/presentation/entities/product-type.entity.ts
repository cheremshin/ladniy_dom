import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    plural: string;

    @Field(() => String)
    slug: string;

    @Field(() => ID)
    categoryId: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => String, { nullable: true })
    deletedAt: Date | null;
}
