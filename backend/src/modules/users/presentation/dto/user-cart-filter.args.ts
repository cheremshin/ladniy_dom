import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class UserCartArgs {
    @Field(() => ID, { nullable: true, description: 'Поиск корзины по userId' })
    @IsOptional()
    @IsUUID(4, { message: 'userId must be a valid UUID' })
    userId?: string;
}

@ArgsType()
export class AddToCartArgs {
    @Field(() => ID, { nullable: true, description: 'Поиск корзины по userId' })
    @IsOptional()
    @IsUUID(4, { message: 'userId must be a valid UUID' })
    userId?: string;

    @Field(() => ID, { description: 'Идентификатор продукта' })
    @IsNotEmpty({ message: 'productId is required' })
    @IsUUID(4, { message: 'productId must be a valid UUID' })
    productId: string;
}

@ArgsType()
export class RemoveFromCartArgs extends AddToCartArgs {}
