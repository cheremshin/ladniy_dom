import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class ToggleUserFavouriteInput {
    @Field(() => ID)
    @IsNotEmpty({ message: 'userId is required' })
    @IsUUID(4, { message: 'userId must be a valid UUID' })
    userId: string;

    @Field(() => ID)
    @IsNotEmpty({ message: 'productId is required' })
    @IsUUID(4, { message: 'productId must be a valid UUID' })
    productId: string;
}
