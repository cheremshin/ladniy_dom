'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { ClientUser } from '../entities/user.types';
import { mapRawUserToClientUser, RawUser } from '../mappers/user.mapper';

type UserContextValue = {
    user: ClientUser;
    setUser: (user: ClientUser) => void;
    clearUser: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

type PropsT = {
    initialUser?: RawUser;
    children: ReactNode;
};

export function UserProvider({ initialUser = null, children }: PropsT) {
    const [user, setUser] = useState<ClientUser>(() => mapRawUserToClientUser(initialUser));

    const value = useMemo(() => ({
        user,
        setUser,
        clearUser: () => setUser(null),
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
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
