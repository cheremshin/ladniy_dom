'use client';

import { Button, ErrorMessage, FormField } from '@/components/base';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { LOGIN } from '@/shared/api/graphql/mutations/auth';
import Link from 'next/link';
import { useState } from 'react';
import { schema, SignInValues } from '../_lib/sign-in.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/shared/contexts/user-context';
import { ME } from '@/shared/api/graphql/queries';
import { MeQuery } from '@/shared/api/graphql/__generated__/types';
import { sidebarBaseRoute } from '@/shared/config/erp.sidebar.config';

const defaultValues: SignInValues = {
    email: '',
    password: '',
};

export const SignInForm = () => {
    const { setUser } = useUser();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignInValues>({
        defaultValues,
        resolver: zodResolver(schema),
    });

    const onSubmit = async (values: { email: string; password: string }) => {
        setSubmitError(null);

        await apolloBrowserClient.mutate({
            mutation: LOGIN,
            variables: { input: { email: values.email, password: values.password } },
        }).then(async () => {
            const user = await apolloBrowserClient.query<MeQuery>({ query: ME });
            if (!user.data) {
                throw Error('Internal server error');
            }

            setUser({
                userId: user.data.me.id,
                role: user.data.me.role,
                email: user.data.me.email,
                firstName: user.data.me.firstName,
                lastName: user.data.me.lastName,
                nickname: user.data.me.nickname,
                isActive: user.data.me.isActive,
                phone: user.data.me.phone,
            });

            window.location.href = user.data.me.role === 'ADMIN' ? sidebarBaseRoute.href : '/';
        }).catch((error) => {
            if (error instanceof Error && error.message === 'Invalid email or password') {
                setSubmitError('Неверный логин или пароль');
                return;
            }

            setSubmitError('Не удалось войти в аккаунт');
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
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
                    {isSubmitting ? 'Вход…' : 'Войти'}
                </Button>
            </form>
            <span className="sign-in-form__register">
                Нет аккаунта?
                <Link href="/auth/sign-up" className="sign-in-form__register_link">
                    Регистрация
                </Link>
            </span>
        </>
    );
};
