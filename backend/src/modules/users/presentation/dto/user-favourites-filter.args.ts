import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class UserFavouritesArgs {
    @Field(() => ID, { nullable: true, description: 'Поиск favourite товаров по userId' })
    @IsOptional()
    @IsUUID(4, { message: 'userId must be a valid UUID' })
    userId?: string;
}

@ArgsType()
export class ToggleUserFavouriteArgs {
    @Field(() => ID, {
        nullable: true,
        description: 'Переключение метки favourite у товара по userId',
    })
    @IsOptional()
    @IsUUID(4, { message: 'userId must be a valid UUID' })
    userId?: string;

    @Field(() => ID, { description: 'Идентификатор продукта' })
    @IsNotEmpty({ message: 'productId is required' })
    @IsUUID(4, { message: 'productId must be a valid UUID' })
    productId: string;
}
