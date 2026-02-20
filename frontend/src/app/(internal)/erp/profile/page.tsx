'use client';

import { Button } from '@/components/base';
import { apolloBrowserClient } from '@/shared/api/apollo/client/apollo-browser-client';
import { LOGOUT } from '@/shared/api/graphql/mutations/auth';

export default function Page() {
    return (
        <>
            <Button onClick={async () => apolloBrowserClient.mutate({ mutation: LOGOUT })}>
                Выйти
            </Button>
        </>
    );
}
