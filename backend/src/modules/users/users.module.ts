import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersResolver } from './presentation/users.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
