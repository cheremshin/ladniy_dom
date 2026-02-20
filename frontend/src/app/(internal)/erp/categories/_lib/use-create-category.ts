'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { createCategorySchema } from '@/shared/schemas';
import { CREATE_CATEGORY } from '@/shared/api/graphql/mutations/category';
import type {
    CreateCategoryMutation,
    CreateCategoryMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type CreateCategoryValues = z.infer<typeof createCategorySchema>;

const DEFAULT_VALUES: CreateCategoryValues = {
    title: '',
    imageUrl: null,
    isActive: true,
    parentId: null,
    sortOrder: 0,
};

export function useCreateCategory(onSuccess: () => void) {
    const [createCategory] = useMutation<
        CreateCategoryMutation,
        CreateCategoryMutationVariables
    >(CREATE_CATEGORY);

    const form = useForm<CreateCategoryValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(createCategorySchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await createCategory({
            variables: {
                input: {
                    title: values.title,
                    imageUrl: values.imageUrl || null,
                    isActive: values.isActive ?? true,
                    parentId: values.parentId || null,
                    sortOrder: values.sortOrder ?? 0,
                },
            },
        });
        form.reset(DEFAULT_VALUES);
        onSuccess();
    });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
