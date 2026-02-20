'use client';

import type { MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { z } from 'zod';

import { createDynamicUpdateProductSchema } from '@/shared/schemas';
import { UPDATE_PRODUCT, ATTACH_PRODUCT_IMAGE } from '@/shared/api/graphql/mutations/product';
import { uploadFile } from '@/shared/api/upload-file';
import type {
    UpdateProductMutation,
    UpdateProductMutationVariables,
    AttachProductImageMutation,
    AttachProductImageMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

const updateProductSchema = createDynamicUpdateProductSchema([]);
export type UpdateProductValues = z.infer<typeof updateProductSchema>;

const DEFAULT_VALUES: UpdateProductValues = {
    id: '',
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
    discountPrice: 0,
    warrantyMonths: 0,
    metaTitle: '',
    metaDescription: '',
};

export function useUpdateProduct(
    onSuccess: () => void,
    fileRef?: MutableRefObject<File | null>,
) {
    const [updateProduct] = useMutation<
        UpdateProductMutation,
        UpdateProductMutationVariables
    >(UPDATE_PRODUCT);
    const [attachProductImage] = useMutation<
        AttachProductImageMutation,
        AttachProductImageMutationVariables
    >(ATTACH_PRODUCT_IMAGE);

    const form = useForm<UpdateProductValues>({
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(updateProductSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await updateProduct({
            variables: {
                input: {
                    id: values.id,
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

        if (fileRef?.current && values.id) {
            const path = await uploadFile(fileRef.current, 'product', values.id);
            await attachProductImage({
                variables: {
                    input: { productId: values.id, url: path, isPrimary: true, sortOrder: 0 },
                },
            });
        }

        form.reset(DEFAULT_VALUES);
        onSuccess();
    }, (error) => {
        console.error(error);
    });

    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
