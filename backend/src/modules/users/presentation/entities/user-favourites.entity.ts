import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserFavourite {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    userId: string;

    @Field(() => ID)
    productId: string;
}

@ObjectType()
export class UserFavourites {
    @Field(() => [UserFavourite])
    items: UserFavourite[];
}
