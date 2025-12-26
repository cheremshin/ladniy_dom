import { Module } from '@nestjs/common';
import { CategoriesService } from './domain/categories.service';
import { CategoriesResolver } from './presentation/categories.resolver';

@Module({
    providers: [CategoriesService, CategoriesResolver],
    exports: [CategoriesService],
})
export class CategoriesModule {}
