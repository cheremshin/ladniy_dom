import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
    @Field(() => ID)
    id: string;

    @Field(() => ID, { nullable: true })
    parentId: string | null;

    @Field()
    title: string;

    @Field()
    slug: string;

    @Field(() => String, { nullable: true })
    imageUrl: string | null;

    @Field(() => Int)
    sortOrder: number;

    @Field()
    isActive: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => Category, { nullable: true })
    parent?: Category | null;

    @Field(() => [Category])
    children?: Category[];
}
