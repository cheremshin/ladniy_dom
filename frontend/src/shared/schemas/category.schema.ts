import { z } from 'zod';
import { numberSchema } from './preprocess.utils';

export const createCategorySchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    imageUrl: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
    parentId: z.string().nullable().optional(),
    sortOrder: numberSchema(),
});

export const updateCategorySchema = z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    imageUrl: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
    parentId: z.string().nullable().optional(),
    sortOrder: numberSchema(),
});
