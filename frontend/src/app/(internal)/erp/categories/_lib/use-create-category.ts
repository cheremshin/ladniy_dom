'use client';

import type { MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { createCategorySchema } from '@/shared/schemas';
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '@/shared/api/graphql/mutations/category';
import { uploadFile } from '@/shared/api/upload-file';
import type {
    CreateCategoryMutation,
    CreateCategoryMutationVariables,
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type CreateCategoryValues = z.infer<typeof createCategorySchema>;

const DEFAULT_VALUES: CreateCategoryValues = {
    title: '',
    imageUrl: null,
    isActive: true,
    parentId: null,
    sortOrder: 0,
};

export function useCreateCategory(
    onSuccess: () => void,
    fileRef?: MutableRefObject<File | null>,
) {
    const [createCategory] = useMutation<
        CreateCategoryMutation,
        CreateCategoryMutationVariables
    >(CREATE_CATEGORY);
    const [updateCategory] = useMutation<
        UpdateCategoryMutation,
        UpdateCategoryMutationVariables
    >(UPDATE_CATEGORY);

    const form = useForm<CreateCategoryValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(createCategorySchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        const result = await createCategory({
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

        const id = result.data?.createCategory.id;
        if (id && fileRef?.current) {
            const path = await uploadFile(fileRef.current, 'category', id);
            await updateCategory({
                variables: { input: { id, imageUrl: path } },
            });
        }

        form.reset(DEFAULT_VALUES);
        onSuccess();
    });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
