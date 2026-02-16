import { z } from 'zod';

export const createProductTypeSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    plural: z.string().min(1, { message: 'Plural is required' }),
    categoryId: z.string().min(1, { message: 'Category ID is required' }),
});

export const updateProductTypeSchema = z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    plural: z.string().min(1, { message: 'Plural is required' }).optional(),
    categoryId: z.string().min(1, { message: 'Category ID is required' }).optional(),
});
