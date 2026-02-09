import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppResolver } from '@/modules/app.resolver';
import { DatabaseModule } from '../database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { SpecificationDefinitionsModule } from './specification-definitions/specification-definitions.module';
import { FilesModule } from './files/files.module';
import { ProductsModule } from './products/products.module';
import { LogginMiddleware } from '@/common/middleware/logging.middleware';
import { validate } from '@/config/configuration';
import { AuthModule } from './auth/auth.module';

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
            context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validate,
        }),
        AuthModule,
    ],
    providers: [AppResolver],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogginMiddleware).forRoutes('*');
    }
}
