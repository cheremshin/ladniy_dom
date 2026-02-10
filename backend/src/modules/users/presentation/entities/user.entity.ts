import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String, { nullable: true })
    firstName: string | null;

    @Field(() => String, { nullable: true })
    lastName: string | null;

    @Field(() => String)
    nickname: string;

    @Field(() => String, { nullable: true })
    phone: string | null;

    @Field(() => Boolean)
    isActive: boolean;
}
