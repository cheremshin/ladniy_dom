import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './domain/categories.service';
import { CategoriesResolver } from './presentation/categories.resolver';
import { FilesModule } from '../files/files.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [FilesModule, forwardRef(() => ProductTypesModule), AuthModule],
    providers: [CategoriesService, CategoriesResolver],
    exports: [CategoriesService],
})
export class CategoriesModule {}
