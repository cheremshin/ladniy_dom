import { Args, ID, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { SpecificationDefinition } from './entities/specification-definition.entity';
import { Paginated } from '@/common/presentation/dto/paginated.response';
import { SpecificationDefinitionsService } from '../domain/specification-definitions.service';
import { SpecificationDefinitionFilterArgs } from './dto/specification-definition-filter.args';
import { buildPaginatedResponse } from '@/common/presentation/utils/pagination.helper';
import {
    CreateSpecificationDefinitionInput,
    UpdateSpecificationDefinitionInput,
} from './dto/specification-definition.input';

@ObjectType()
export class PaginatedSpecificationDefinitions extends Paginated(SpecificationDefinition) {}

@Resolver(() => SpecificationDefinition)
export class SpecificationDefinitionsResolver {
    constructor(
        private readonly specificationDefinitionsService: SpecificationDefinitionsService,
    ) {}

    @Query(() => PaginatedSpecificationDefinitions, { name: 'specificationDefinitions' })
    async getSpecificationDefinitions(
        @Args({ nullable: true }) filters?: SpecificationDefinitionFilterArgs,
    ): Promise<PaginatedSpecificationDefinitions> {
        const { page = 1, limit = 20, ...serviceFilters } = filters || {};
        const offset = (page - 1) * limit;

        const result = await this.specificationDefinitionsService.findAll(
            serviceFilters,
            offset,
            limit,
        );
        return buildPaginatedResponse<SpecificationDefinition>(result, page, limit);
    }

    @Query(() => SpecificationDefinition, { name: 'specificationDefinition' })
    async getSpecificationDefinition(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<SpecificationDefinition> {
        return this.specificationDefinitionsService.findOne(id);
    }

    @Mutation(() => SpecificationDefinition, { name: 'createSpecificationDefinition' })
    async createSpecificationDefinition(
        @Args('input') input: CreateSpecificationDefinitionInput,
    ): Promise<SpecificationDefinition> {
        return this.specificationDefinitionsService.create(input);
    }

    @Mutation(() => SpecificationDefinition, { name: 'updateSpecificationDefinition' })
    async updateSpecificationDefinition(
        @Args('input') input: UpdateSpecificationDefinitionInput,
    ): Promise<SpecificationDefinition> {
        const { id, ...data } = input;
        return this.specificationDefinitionsService.update(id, data);
    }

    @Mutation(() => SpecificationDefinition, { name: 'hardDeleteSpecificationDefinition' })
    async hardDeleteSpecificationDefinition(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<SpecificationDefinition> {
        return this.specificationDefinitionsService.hardDelete(id);
    }

    @Mutation(() => SpecificationDefinition, { name: 'softDeleteSpecificationDefinition' })
    async softDeleteSpecificationDefinition(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<SpecificationDefinition> {
        return this.specificationDefinitionsService.softDelete(id);
    }

    @Mutation(() => SpecificationDefinition, { name: 'restoreSpecificationDefinition' })
    async restoreSpecificationDefinition(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<SpecificationDefinition> {
        return this.specificationDefinitionsService.restore(id);
    }
}
