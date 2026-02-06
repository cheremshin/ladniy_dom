'use server';

import { ProductTypesQuery } from '@/shared/api/graphql/__generated__/types';
import { graphqlFetch } from '../apollo/client/apollo-server-client';
import { PRODUCT_TYPES } from '@/shared/api/graphql/operations/product-types';
import { type ProductTypeDTO } from '@/shared/entities/product-type.types';

export async function getProductTypes(categoryId: string): Promise<ProductTypeDTO[]> {
    const data = await graphqlFetch<ProductTypesQuery>(
        PRODUCT_TYPES,
        { categoryId },
    );

    return data?.productTypes.items ?? [];
}
