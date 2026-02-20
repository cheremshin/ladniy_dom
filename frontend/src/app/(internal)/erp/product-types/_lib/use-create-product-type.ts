'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { createProductTypeSchema } from '@/shared/schemas';
import { CREATE_PRODUCT_TYPE } from '@/shared/api/graphql/mutations/product-type';
import type {
    CreateProductTypeMutation,
    CreateProductTypeMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type CreateProductTypeValues = z.infer<typeof createProductTypeSchema>;

const DEFAULT_VALUES: CreateProductTypeValues = {
    title: '',
    plural: '',
    categoryId: '',
};

export function useCreateProductType(onSuccess: () => void) {
    const [createProductType] = useMutation<
        CreateProductTypeMutation,
        CreateProductTypeMutationVariables
    >(CREATE_PRODUCT_TYPE);

    const form = useForm<CreateProductTypeValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(createProductTypeSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await createProductType({
            variables: {
                input: {
                    title: values.title,
                    plural: values.plural,
                    categoryId: values.categoryId,
                },
            },
        });
        form.reset(DEFAULT_VALUES);
        onSuccess();
    });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
