import { Module } from '@nestjs/common';
import { SpecificationDefinitionsService } from './domain/specification-definitions.service';
import { ProductTypesModule } from '../product-types/product-types.module';
import { SpecificationDefinitionsResolver } from './presentation/specification-definitions.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [ProductTypesModule, AuthModule],
    providers: [SpecificationDefinitionsService, SpecificationDefinitionsResolver],
    exports: [SpecificationDefinitionsService],
})
export class SpecificationDefinitionsModule {}
