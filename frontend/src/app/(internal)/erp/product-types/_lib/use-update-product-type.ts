'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { updateProductTypeSchema } from '@/shared/schemas';
import { UPDATE_PRODUCT_TYPE } from '@/shared/api/graphql/mutations/product-type';
import type {
    UpdateProductTypeMutation,
    UpdateProductTypeMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type UpdateProductTypeValues = z.infer<typeof updateProductTypeSchema>;

const DEFAULT_VALUES: UpdateProductTypeValues = {
    id: '',
    title: '',
    plural: '',
    categoryId: '',
};

export function useUpdateProductType(onSuccess: () => void) {
    const [updateProductType] = useMutation<
        UpdateProductTypeMutation,
        UpdateProductTypeMutationVariables
    >(UPDATE_PRODUCT_TYPE);

    const form = useForm<UpdateProductTypeValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(updateProductTypeSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await updateProductType({
            variables: {
                input: {
                    id: values.id,
                    title: values.title,
                    plural: values.plural,
                    categoryId: values.categoryId,
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
