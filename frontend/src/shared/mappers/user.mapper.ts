import { MeQuery } from '../api/graphql/__generated__/types';
import { ClientUser } from '../entities/user.types';

export type RawUser = MeQuery['me'] | null;

export function mapRawUserToClientUser(raw: RawUser): ClientUser {
    if (!raw) return null;

    return {
        userId: raw.id,
        role: raw.role,
        email: raw.email,
        firstName: raw.firstName,
        lastName: raw.lastName,
        nickname: raw.nickname,
        phone: raw.phone,
        isActive: raw.isActive,
    };
}
