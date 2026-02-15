import { Card } from '@/components/base';
import { SignUpForm } from './_components/sign-up.form';

import './page.styles.css';

export default async function Page() {
    return (
        <main className="sign-up-page">
            <Card className="sign-up-card">
                <h1>Регистрация</h1>
                <SignUpForm />
            </Card>
        </main>
    );
}
