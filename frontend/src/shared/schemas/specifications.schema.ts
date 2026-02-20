import { z } from 'zod';

export const createSpecificationDefinitionSchema = z.object({
    key: z.string().min(1, { message: 'Key is required' }),
    displayName: z.string().min(1, { message: 'Display Name is required' }),
    productTypeId: z.string().min(1, { message: 'Product Type ID is required' }),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    isFilterable: z.boolean().optional(),
    unit: z.string().optional(),
});

export const updateSpecificationDefinitionSchema = z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    key: z.string().min(1, { message: 'Key is required' }).optional(),
    displayName: z.string().min(1, { message: 'Display Name is required' }).optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    isFilterable: z.boolean().optional(),
    unit: z.string().optional(),
});
