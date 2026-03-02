'use client';

import { Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { createBrandSchema } from '@/shared/schemas';
import { CREATE_BRAND } from '@/shared/api/graphql/mutations/brand';
import type {
    CreateBrandMutation,
    CreateBrandMutationVariables,
} from '@/shared/api/graphql/__generated__/types';
import { BRANDS } from '@/shared/api/graphql/queries';

export type CreateBrandValues = z.infer<typeof createBrandSchema>;

const DEFAULT_VALUES: CreateBrandValues = {
    title: '',
    country: '',
    description: '',
    isActive: true,
    logoUrl: null,
    website: null,
};

export function useCreateBrand(onSuccess: () => void) {
    const [createBrand] = useMutation<
        CreateBrandMutation,
        CreateBrandMutationVariables
    >(CREATE_BRAND, { refetchQueries: [BRANDS] });

    const form = useForm<CreateBrandValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(createBrandSchema) as Resolver<CreateBrandValues>,
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await createBrand({
            variables: {
                input: {
                    title: values.title,
                    country: values.country || undefined,
                    description: values.description || undefined,
                    isActive: values.isActive ?? true,
                    logoUrl: values.logoUrl || undefined,
                    website: values.website || undefined,
                },
            },
        });
        form.reset(DEFAULT_VALUES);
        onSuccess();
    }, (error) => {
        console.log(error);
    });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
