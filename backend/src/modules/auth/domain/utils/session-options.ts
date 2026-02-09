import { ConfigService } from '@nestjs/config';

export const getSessionOptions = (configService: ConfigService) => {
    return {
        password: configService.get<string>('SESSION_SECRET')!,
        cookieName: 'session',
        ttl: 60 * 60 * 24 * 7,
        cookieOptions: {
            httpOnly: true,
            secure: configService.get<string>('NODE_ENV') === 'production',
            sameSite: 'lax',
            path: '/',
        },
    };
};
