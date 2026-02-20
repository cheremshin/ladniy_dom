import { SessionService } from '@/modules/auth/domain/session.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly sessionService: SessionService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req, res } = ctx.getContext<{ req: Request; res: Response }>();
        const session = await this.sessionService.getSession(req, res);
        if (!session || !session.user) {
            throw new UnauthorizedException('No active session');
        }
        req.session = { user: session.user };
        return true;
    }
}
