'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { updateBrandSchema } from '@/shared/schemas';
import { UPDATE_BRAND } from '@/shared/api/graphql/mutations/brand';
import type {
    UpdateBrandMutation,
    UpdateBrandMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type UpdateBrandValues = z.infer<typeof updateBrandSchema>;

const DEFAULT_VALUES: UpdateBrandValues = {
    id: '',
    title: '',
    country: '',
    description: '',
    isActive: true,
    logoUrl: null,
    website: null,
};

export function useUpdateBrand(onSuccess: () => void) {
    const [updateBrand] = useMutation<
        UpdateBrandMutation,
        UpdateBrandMutationVariables
    >(UPDATE_BRAND);

    const form = useForm<UpdateBrandValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(updateBrandSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await updateBrand({
            variables: {
                input: {
                    id: values.id,
                    title: values.title,
                    country: values.country || undefined,
                    description: values.description || undefined,
                    isActive: values.isActive,
                    logoUrl: values.logoUrl || undefined,
                    website: values.website?.trim() ? values.website : undefined,
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
