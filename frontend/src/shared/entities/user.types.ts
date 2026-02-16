export type ClientUser = {
    userId: string;
    role: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    nickname: string;
    phone?: string | null;
    isActive: boolean;
} | null;
