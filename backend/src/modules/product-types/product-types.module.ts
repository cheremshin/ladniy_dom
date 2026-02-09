import { forwardRef, Module } from '@nestjs/common';
import { ProductTypesService } from './domain/product-types.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductTypesResolver } from './presentation/product-types.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [forwardRef(() => CategoriesModule), AuthModule],
    providers: [ProductTypesService, ProductTypesResolver],
    exports: [ProductTypesService],
})
export class ProductTypesModule {}
