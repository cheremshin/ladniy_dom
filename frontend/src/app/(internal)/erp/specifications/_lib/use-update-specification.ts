'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { updateSpecificationDefinitionSchema } from '@/shared/schemas';
import { UPDATE_SPECIFICATION_DEFINITION } from '@/shared/api/graphql/mutations/specification-definition';
import type {
    UpdateSpecificationDefinitionMutation,
    UpdateSpecificationDefinitionMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

export type UpdateSpecificationValues = z.infer<typeof updateSpecificationDefinitionSchema>;

const DEFAULT_VALUES: UpdateSpecificationValues = {
    id: '',
    key: '',
    displayName: '',
    description: '',
    unit: '',
    isFilterable: false,
    isActive: true,
};

export function useUpdateSpecification(onSuccess: () => void) {
    const [updateSpecificationDefinition] = useMutation<
        UpdateSpecificationDefinitionMutation,
        UpdateSpecificationDefinitionMutationVariables
    >(UPDATE_SPECIFICATION_DEFINITION);

    const form = useForm<UpdateSpecificationValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(updateSpecificationDefinitionSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await updateSpecificationDefinition({
            variables: {
                input: {
                    id: values.id,
                    key: values.key,
                    displayName: values.displayName,
                    description: values.description || undefined,
                    unit: values.unit || undefined,
                    isFilterable: values.isFilterable,
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
