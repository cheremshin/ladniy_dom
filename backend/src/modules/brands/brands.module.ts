import { Module } from '@nestjs/common';
import { BrandsService } from './domain/brands.service';
import { BrandsResolver } from './presentation/brands.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [BrandsService, BrandsResolver, AuthModule],
    exports: [BrandsService],
})
export class BrandsModule {}
