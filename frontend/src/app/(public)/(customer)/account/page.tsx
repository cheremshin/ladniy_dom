'use client';

import { Button, Card } from '@/components/base';
import { useUser } from '@/shared/contexts/user-context';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { LOGOUT } from '@/shared/api/graphql/mutations/auth';

import './page.styles.css';

const ROLE_LABELS: Record<string, string> = {
    ADMIN: 'Администратор',
    USER: 'Пользователь',
    GUEST: 'Гость',
};

function formatValue(value: string | null | undefined): string {
    return value?.trim() ? value : '—';
}

export default function AccountPage() {
    const { user } = useUser();

    const handleLogout = async () => {
        await apolloBrowserClient.mutate({ mutation: LOGOUT });
        window.location.href = '/';
    };

    if (!user) {
        return (
            <main className="account-page">
                <Card>
                    <p className="account-page__empty">Вы не авторизованы.</p>
                </Card>
            </main>
        );
    }

    return (
        <main className="account-page">
            <h1 className="account-page__title">Личный кабинет</h1>
            <Card className="account-page__card">
                <dl className="account-profile">
                    <div className="account-profile__row">
                        <dt className="account-profile__term">Имя</dt>
                        <dd className="account-profile__value">
                            {formatValue(user.firstName ?? undefined)}
                        </dd>
                    </div>
                    <div className="account-profile__row">
                        <dt className="account-profile__term">Фамилия</dt>
                        <dd className="account-profile__value">
                            {formatValue(user.lastName ?? undefined)}
                        </dd>
                    </div>
                    <div className="account-profile__row">
                        <dt className="account-profile__term">Отображаемое имя</dt>
                        <dd className="account-profile__value">
                            {formatValue(user.nickname)}
                        </dd>
                    </div>
                    <div className="account-profile__row">
                        <dt className="account-profile__term">Email</dt>
                        <dd className="account-profile__value">{user.email}</dd>
                    </div>
                    <div className="account-profile__row">
                        <dt className="account-profile__term">Телефон</dt>
                        <dd className="account-profile__value">
                            {formatValue(user.phone ?? undefined)}
                        </dd>
                    </div>
                    <div className="account-profile__row">
                        <dt className="account-profile__term">Роль</dt>
                        <dd className="account-profile__value">
                            {ROLE_LABELS[user.role] ?? user.role}
                        </dd>
                    </div>
                </dl>
                <div className="account-page__actions">
                    <Button
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </div>
            </Card>
        </main>
    );
}
