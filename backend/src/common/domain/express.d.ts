import { SessionData } from '@/modules/auth/domain/entities/session-data';

declare module 'express' {
    interface Request {
        session?: SessionData;
    }
}
