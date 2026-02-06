import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './domain/categories.service';
import { CategoriesResolver } from './presentation/categories.resolver';
import { FilesModule } from '../files/files.module';
import { ProductTypesModule } from '../product-types/product-types.module';

@Module({
    imports: [FilesModule, forwardRef(() => ProductTypesModule)],
    providers: [CategoriesService, CategoriesResolver],
    exports: [CategoriesService],
})
export class CategoriesModule {}
