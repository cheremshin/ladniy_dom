import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    mimeType: string;

    @Field(() => Int)
    size: number;

    @Field(() => String)
    path: string;

    @Field(() => String, { nullable: true })
    entityType?: string | null;

    @Field(() => String, { nullable: true })
    entityId?: string | null;
}
