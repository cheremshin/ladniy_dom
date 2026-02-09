import { Module } from '@nestjs/common';
import { BrandsModule } from '../brands/brands.module';
import { ProductsService } from './domain/products.service';
import { ProductsResolver } from './presentation/products.resolver';
import { CategoriesModule } from '../categories/categories.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [CategoriesModule, BrandsModule, ProductTypesModule, FilesModule, AuthModule],
    providers: [ProductsService, ProductsResolver],
    exports: [ProductsService],
})
export class ProductsModule {}
