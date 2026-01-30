import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from '@/modules/app.resolver';
import { DatabaseModule } from '../database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { SpecificationDefinitionsModule } from './specification-definitions/specification-definitions.module';
import { FilesModule } from './files/files.module';
import { ProductsModule } from './products/products.module';
import { LogginMiddleware } from '@/common/middleware/logging.middleware';

@Module({
    imports: [
        DatabaseModule,
        FilesModule,
        CategoriesModule,
        BrandsModule,
        ProductTypesModule,
        SpecificationDefinitionsModule,
        ProductsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: true,
        }),
    ],
    providers: [AppResolver],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogginMiddleware).forRoutes('*');
    }
}
