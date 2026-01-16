import { Module } from '@nestjs/common';
import { SpecificationDefinitionsService } from './domain/specification-definitions.service';
import { ProductTypesModule } from '../product-types/product-types.module';
import { SpecificationDefinitionsResolver } from './presentation/specification-definitions.resolver';

@Module({
    imports: [ProductTypesModule],
    providers: [SpecificationDefinitionsService, SpecificationDefinitionsResolver],
    exports: [SpecificationDefinitionsService],
})
export class SpecificationDefinitionsModule {}
