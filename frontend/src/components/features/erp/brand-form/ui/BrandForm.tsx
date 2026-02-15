'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, FormField, ErrorMessage } from '@/components/base';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';

import { brandSchema, BrandFormValues } from '../lib/brand.schema';
import { CREATE_BRAND, UPDATE_BRAND } from '@/shared/api/graphql/mutations/brand';

type Props = {
    initialValues?: BrandFormValues;
    brandId?: string;
};

export const BrandForm = ({ initialValues, brandId }: Props) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<BrandFormValues>({
        defaultValues: initialValues ?? {
            title: '',
            slug: '',
            description: null,
            logoUrl: null,
            country: null,
            website: null,
            isActive: true,
        },
        resolver: zodResolver(brandSchema),
    });

    const onSubmit = async (values: BrandFormValues) => {
        setSubmitError(null);

        try {
            if (brandId) {
                await apolloBrowserClient.mutate({
                    mutation: UPDATE_BRAND,
                    variables: { input: { id: brandId, ...values } },
                });
            } else {
                await apolloBrowserClient.mutate({
                    mutation: CREATE_BRAND,
                    variables: { input: values },
                });
            }

            router.push('/admin/brands');
            router.refresh();
        } catch {
            setSubmitError('Ошибка сохранения');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField name="title" control={control} label="Название" />
            <FormField name="slug" control={control} label="Slug" />
            <FormField name="description" control={control} label="Описание" />
            <FormField name="logoUrl" control={control} label="Logo URL" />
            <FormField name="country" control={control} label="Страна" />
            <FormField name="website" control={control} label="Website" />
            <FormField name="isActive" control={control} label="Активен" type="checkbox" />

            {submitError && <ErrorMessage error={submitError} />}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение…' : 'Сохранить'}
            </Button>
        </form>
    );
};
