'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { updateCategorySchema } from '@/shared/schemas';
import { UPDATE_CATEGORY } from '@/shared/api/graphql/mutations/category';
import { uploadFile } from '@/shared/api/upload-file';
import type {
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type UpdateCategoryValues = z.infer<typeof updateCategorySchema>;

const DEFAULT_VALUES: UpdateCategoryValues = {
    id: '',
    title: '',
    parentId: undefined,
    sortOrder: 0,
    imageUrl: undefined,
    isActive: true,
};

export function useUpdateCategory(
    onSuccess: () => void,
) {
    const [updateCategory] = useMutation<
        UpdateCategoryMutation,
        UpdateCategoryMutationVariables
    >(UPDATE_CATEGORY);

    const form = useForm<UpdateCategoryValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(updateCategorySchema),
    });

    const onSubmit = (fileInput?: File | null) =>
        form.handleSubmit(async (values) => {
            let imageUrl = values.imageUrl ?? undefined;

            if (fileInput) {
                imageUrl = await uploadFile(fileInput, 'category', values.id);
            }

            await updateCategory({
                variables: {
                    input: {
                        id: values.id,
                        title: values.title,
                        parentId: values.parentId || undefined,
                        sortOrder: values.sortOrder,
                        imageUrl,
                        isActive: values.isActive,
                    },
                },
            });

            form.reset(DEFAULT_VALUES);
            onSuccess();
        }, (error) => {
            console.error(error);
        });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
