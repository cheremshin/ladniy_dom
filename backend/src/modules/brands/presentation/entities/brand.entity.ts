import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Brand {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    slug: string;

    @Field(() => String, { nullable: true })
    description: string | null;

    @Field(() => String, { nullable: true })
    logoUrl: string | null;

    @Field(() => String, { nullable: true })
    country: string | null;

    @Field(() => String, { nullable: true })
    website: string | null;

    @Field(() => Boolean)
    isActive: boolean;
}
