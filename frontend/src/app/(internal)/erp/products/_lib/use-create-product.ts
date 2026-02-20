'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { createDynamicCreateProductSchema } from '@/shared/schemas';
import { CREATE_PRODUCT } from '@/shared/api/graphql/mutations/product';
import type {
    CreateProductMutation,
    CreateProductMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

const createProductSchema = createDynamicCreateProductSchema([]);
export type CreateProductValues = z.infer<typeof createProductSchema>;

const DEFAULT_VALUES: CreateProductValues = {
    title: '',
    sku: '',
    basePrice: 0,
    costPrice: 0,
    brandId: '',
    categoryId: '',
    productTypeId: '',
    description: '',
    status: 'DRAFT',
    isFeatured: false,
    stockQuantity: 0,
};

export function useCreateProduct(onSuccess: () => void) {
    const [createProduct] = useMutation<
        CreateProductMutation,
        CreateProductMutationVariables
    >(CREATE_PRODUCT);

    const form = useForm<CreateProductValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(createProductSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await createProduct({
            variables: {
                input: {
                    title: values.title,
                    sku: values.sku,
                    basePrice: values.basePrice,
                    costPrice: values.costPrice,
                    brandId: values.brandId,
                    categoryId: values.categoryId,
                    productTypeId: values.productTypeId,
                    description: values.description || undefined,
                    status: values.status,
                    isFeatured: values.isFeatured ?? false,
                    stockQuantity: values.stockQuantity ?? 0,
                    discountPrice: values.discountPrice,
                    warrantyMonths: values.warrantyMonths,
                    metaTitle: values.metaTitle,
                    metaDescription: values.metaDescription,
                },
            },
        });
        form.reset(DEFAULT_VALUES);
        onSuccess();
    });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
