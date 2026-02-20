import { Card } from '@/components/base';
import { SignInForm } from './_components/sign-in.form';

import './page.styles.css';

export default async function Page() {
    return (
        <main className="sign-in-page">
            <Card className="sign-in-card">
                <h1>Вход</h1>
                <SignInForm />
            </Card>
        </main>
    );
}
