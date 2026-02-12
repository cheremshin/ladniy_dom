import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCartItem {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    userId: string;

    @Field(() => ID)
    productId: string;

    @Field(() => Int)
    quantity: number;
}

@ObjectType()
export class UserCart {
    @Field(() => [UserCartItem])
    items: UserCartItem[];
}
