import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
    @Field(() => ID)
    id: string;

    @Field(() => ID, { nullable: true })
    parentId: string | null;

    @Field(() => String)
    title: string;

    @Field(() => String)
    slug: string;

    @Field(() => String, { nullable: true })
    imageUrl: string | null;

    @Field(() => Int)
    sortOrder: number;

    @Field(() => Boolean)
    isActive: boolean;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => String, { nullable: true })
    deletedAt: Date | null;

    @Field(() => Category, { nullable: true })
    parent?: Category | null;

    @Field(() => [Category])
    children?: Category[];
}
