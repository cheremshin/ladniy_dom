import { z } from 'zod';

export const createBrandSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    country: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    logoUrl: z.string().nullable().optional(),
    website: z.url({ message: 'Invalid URL' }).nullable().optional(),
});

export const updateBrandSchema = z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    country: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    logoUrl: z.string().nullable().optional(),
    website: z.url({ message: 'Invalid URL' }).nullable().optional(),
});
