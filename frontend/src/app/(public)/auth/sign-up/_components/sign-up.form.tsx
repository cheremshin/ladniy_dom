'use client';

import { Button, ErrorMessage, FormField } from '@/components/base';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { REGISTER } from '@/shared/api/graphql/mutations';
import Link from 'next/link';
import { FC, useState } from 'react';
import { schema, SignUpValues } from '../_lib/sign-up.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues: SignUpValues = {
    email: '',
    password: '',
};

export const SignUpForm: FC = () => {
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpValues>({
        defaultValues,
        resolver: zodResolver(schema),
    });

    const onSubmit = async (values: { email: string; password: string }) => {
        setSubmitError(null);

        await apolloBrowserClient.mutate({
            mutation: REGISTER,
            variables: { input: { email: values.email, password: values.password } },
        }).then(() => {
            window.location.href = '/';
        }).catch(() => {
            setSubmitError('Не удалось создать аккаунт');
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
                <FormField
                    name="email"
                    control={control}
                    label="Email"
                    type="email"
                    autoComplete="email"
                />
                <FormField
                    name="password"
                    control={control}
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                />
                {submitError && <ErrorMessage error={submitError} />}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Регистрация…' : 'Создать аккаунт'}
                </Button>
            </form>
            <span className="sign-up-form__login">
                Уже есть аккаунт?
                <Link href="/auth/sign-in" className="sign-up-form__login_link">
                    Войти
                </Link>
            </span>
        </>
    );
};
