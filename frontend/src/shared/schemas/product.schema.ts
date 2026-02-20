import { z } from 'zod';

export const productStatusSchema = z.enum(['ACTIVE', 'DISCOUNTED', 'DRAFT', 'OUT_OF_STOCK']);

const createProductBaseSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    basePrice: z.number({ message: 'Base price must be a number' }),
    brandId: z.string().min(1, { message: 'Brand ID is required' }),
    categoryId: z.string().min(1, { message: 'Category ID is required' }),
    costPrice: z.number({ message: 'Cost price must be a number' }),
    productTypeId: z.string().min(1, { message: 'Product Type ID is required' }),
    sku: z.string().min(1, { message: 'SKU is required' }),
    description: z.string().optional(),
    discountPrice: z.number().optional(),
    isFeatured: z.boolean().optional(),
    metaDescription: z.string().optional(),
    metaTitle: z.string().optional(),
    status: productStatusSchema.optional(),
    stockQuantity: z.number().int().optional(),
    warrantyMonths: z.number().int().optional(),
});

const updateProductBaseSchema = z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    basePrice: z.number({ message: 'Base price must be a number' }).optional(),
    brandId: z.string().min(1, { message: 'Brand ID is required' }).optional(),
    categoryId: z.string().min(1, { message: 'Category ID is required' }).optional(),
    costPrice: z.number({ message: 'Cost price must be a number' }).optional(),
    productTypeId: z.string().min(1, { message: 'Product Type ID is required' }).optional(),
    sku: z.string().min(1, { message: 'SKU is required' }).optional(),
    description: z.string().optional(),
    discountPrice: z.number().optional(),
    isFeatured: z.boolean().optional(),
    metaDescription: z.string().optional(),
    metaTitle: z.string().optional(),
    status: productStatusSchema.optional(),
    stockQuantity: z.number().int().optional(),
    warrantyMonths: z.number().int().optional(),
});

const createSpecificationValueSchema = (allowedKeys: string[]) => {
    if (allowedKeys.length === 0) {
        return z.object({
            key: z.string(),
            value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
        });
    }
    return z.object({
        key: z.enum(allowedKeys as [string, ...string[]]),
        value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
    });
};

export const createDynamicCreateProductSchema = (allowedKeys: string[]) => {
    const specSchema = createSpecificationValueSchema(allowedKeys);
    return createProductBaseSchema.extend({
        specifications: z.array(specSchema).optional(),
    });
};

export const createDynamicUpdateProductSchema = (allowedKeys: string[]) => {
    const specSchema = createSpecificationValueSchema(allowedKeys);
    return updateProductBaseSchema.extend({
        specifications: z.array(specSchema).optional(),
    });
};
