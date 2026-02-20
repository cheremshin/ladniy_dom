'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { createSpecificationDefinitionSchema } from '@/shared/schemas';
import { CREATE_SPECIFICATION_DEFINITION } from '@/shared/api/graphql/mutations/specification-definition';
import type {
    CreateSpecificationDefinitionMutation,
    CreateSpecificationDefinitionMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type CreateSpecificationValues = z.infer<typeof createSpecificationDefinitionSchema>;

const DEFAULT_VALUES: CreateSpecificationValues = {
    key: '',
    displayName: '',
    productTypeId: '',
    description: '',
    isActive: true,
    isFilterable: false,
    unit: '',
};

export function useCreateSpecification(onSuccess: () => void) {
    const [createSpecification] = useMutation<
        CreateSpecificationDefinitionMutation,
        CreateSpecificationDefinitionMutationVariables
    >(CREATE_SPECIFICATION_DEFINITION);

    const form = useForm<CreateSpecificationValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(createSpecificationDefinitionSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await createSpecification({
            variables: {
                input: {
                    key: values.key,
                    displayName: values.displayName,
                    productTypeId: values.productTypeId,
                    description: values.description || undefined,
                    isActive: values.isActive ?? true,
                    isFilterable: values.isFilterable ?? false,
                    unit: values.unit || undefined,
                },
            },
        });
        form.reset(DEFAULT_VALUES);
        onSuccess();
    });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
