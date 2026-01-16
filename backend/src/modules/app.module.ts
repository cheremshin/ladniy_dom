import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from '@/modules/app.resolver';
import { DatabaseModule } from '../database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductTypesModule } from './product-types/product-types.module';

@Module({
    imports: [
        DatabaseModule,
        CategoriesModule,
        BrandsModule,
        ProductTypesModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: true,
        }),
    ],
    providers: [AppResolver],
})
export class AppModule {}
