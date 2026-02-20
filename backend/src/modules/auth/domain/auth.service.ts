import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionService } from './session.service';
import { users } from '@/database/schema';
import { eq, sql } from 'drizzle-orm';
import { compare } from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { SessionData } from './entities/session-data';
import { Request, Response } from 'express';

export type LoginData = {
    email: string;
    password: string;
};

@Injectable()
export class AuthService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
        private readonly sessionService: SessionService,
    ) {}

    async login(data: LoginData, req: Request, res: Response): Promise<void> {
        return this.db.transaction(async (tx) => {
            const user = await tx.query.users.findFirst({
                where: eq(users.email, data.email),
            });

            if (!user) {
                throw new UnauthorizedException('Invalid email or password');
            }

            const isPasswordValid = await compare(data.password, user.passwordHash);
            if (!isPasswordValid) {
                await tx
                    .update(users)
                    .set({
                        failedLoginAttempts: user.failedLoginAttempts + 1,
                    })
                    .where(eq(users.id, user.id));

                if (user.failedLoginAttempts + 1 >= 3) {
                    await tx
                        .update(users)
                        .set({
                            isActive: false,
                            failedLoginAttempts: 0,
                            passwordResetToken: randomUUID(),
                            passwordResetTokenExpires: sql`now() + interval '1 day'`,
                        })
                        .where(eq(users.id, user.id));

                    // TODO: Отправлять email с токеном для сброса пароля

                    throw new UnauthorizedException('Account is locked');
                }

                throw new UnauthorizedException('Invalid email or password');
            }

            if (user.isActive === false) {
                throw new UnauthorizedException('Account is locked');
            }

            await tx
                .update(users)
                .set({
                    lastLogin: sql`now()`,
                    failedLoginAttempts: 0,
                })
                .where(eq(users.id, user.id));

            const userData: SessionData = {
                user: {
                    userId: user.id,
                    role: user.role,
                    email: user.email,
                },
            };

            await this.sessionService.saveSession(req, res, userData);
        });
    }

    async logout(req: Request, res: Response): Promise<void> {
        await this.sessionService.deleteSession(req, res);
    }
}
