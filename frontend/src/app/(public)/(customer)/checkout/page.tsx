import { Card } from '@/components/base';
import Image from 'next/image';

import './page.styles.css';

export default async function Page() {
    return (
        <main>
            <Card className="checkout-container">
                Тут должна быть логика оформления заказа, но я добрый курсовой проект...
                <Image src="/images/not-found.jpg" alt="" width={600} height={400} />
            </Card>
        </main>
    );
}
