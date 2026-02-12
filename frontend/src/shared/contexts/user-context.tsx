'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { MeQuery } from '../api/graphql/__generated__/types';

export type RawUser = MeQuery['me'] | null;

export type User = { userId: string; role: string; email: string } | null;

type UserContextValue = {
    user: User;
    setUser: (user: User) => void;
    clearUser: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

type PropsT = {
    initialUser?: RawUser;
    children: ReactNode;
};

export function UserProvider({ initialUser = null, children }: PropsT) {
    const [user, setUser] = useState<User>(initialUser && {
        userId: initialUser.id,
        role: initialUser.role,
        email: initialUser.email,
    });

    const value = useMemo(() => ({
        user,
        setUser,
        clearUser: () => setUser(null),
    }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used inside UserProvider');
    }

    return context;
}
