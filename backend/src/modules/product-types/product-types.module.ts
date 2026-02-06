import { forwardRef, Module } from '@nestjs/common';
import { ProductTypesService } from './domain/product-types.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductTypesResolver } from './presentation/product-types.resolver';

@Module({
    imports: [forwardRef(() => CategoriesModule)],
    providers: [ProductTypesService, ProductTypesResolver],
    exports: [ProductTypesService],
})
export class ProductTypesModule {}
