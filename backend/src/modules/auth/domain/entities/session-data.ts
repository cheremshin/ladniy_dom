import { users } from '@/database/schema';

type UserRole = typeof users.role._.data;

export interface SessionData {
    user?: {
        userId: string;
        role: UserRole;
        email: string;
    };
}
