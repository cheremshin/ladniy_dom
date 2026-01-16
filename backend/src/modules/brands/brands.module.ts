import { Module } from '@nestjs/common';
import { BrandsService } from './domain/brands.service';
import { BrandsResolver } from './presentation/brands.resolver';

@Module({
    providers: [BrandsService, BrandsResolver],
    exports: [BrandsService],
})
export class BrandsModule {}
