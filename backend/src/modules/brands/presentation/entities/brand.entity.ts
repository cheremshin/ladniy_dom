import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Brand {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    slug: string;

    @Field(() => String, { nullable: true })
    description: string | null;

    @Field(() => String, { nullable: true })
    logoUrl: string | null;

    @Field(() => String, { nullable: true })
    country: string | null;

    @Field(() => String, { nullable: true })
    website: string | null;

    @Field()
    isActive: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => String, { nullable: true })
    deletedAt: string | null;
}
