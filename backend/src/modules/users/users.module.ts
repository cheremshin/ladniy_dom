import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersResolver } from './presentation/users.resolver';
import { AuthModule } from '../auth/auth.module';
import { UserFavouritesService } from './domain/favourites.service';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [AuthModule, ProductsModule],
    providers: [UsersService, UsersResolver, UserFavouritesService],
    exports: [UsersService],
})
export class UsersModule {}
