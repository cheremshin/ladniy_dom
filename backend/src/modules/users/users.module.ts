import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersResolver } from './presentation/users.resolver';
import { AuthModule } from '../auth/auth.module';
import { UserFavouritesService } from './domain/favourites.service';
import { UserCartService } from './domain/cart.service';

@Module({
    imports: [AuthModule],
    providers: [UsersService, UsersResolver, UserFavouritesService, UserCartService],
    exports: [UsersService],
})
export class UsersModule {}
