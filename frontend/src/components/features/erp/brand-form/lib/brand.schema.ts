import { z } from 'zod';

export const brandSchema = z.object({
    title: z.string().min(1, 'Обязательное поле'),
    slug: z.string().min(1, 'Обязательное поле'),
    description: z.string().nullable().optional(),
    logoUrl: z.string().url().nullable().optional(),
    country: z.string().nullable().optional(),
    website: z.string().url().nullable().optional(),
    isActive: z.boolean(),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
