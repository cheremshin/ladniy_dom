import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SessionService } from './domain/session.service';
import { SessionGuard } from './guards/session.guard';
import { AuthService } from './domain/auth.service';
import { AuthResolver } from './presentation/auth.resolver';
import { RolesGuard } from './guards/roles.guard';

@Module({
    imports: [ConfigModule],
    providers: [SessionService, SessionGuard, AuthService, AuthResolver, RolesGuard],
    exports: [SessionService, SessionGuard, AuthService, RolesGuard],
})
export class AuthModule {}
