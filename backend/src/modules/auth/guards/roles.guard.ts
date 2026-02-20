import { GqlContext } from '@/common/presentation/dto/gql.context';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext<GqlContext>().req;
        const user = req.session?.user;
        if (!user) {
            return false;
        }

        return requiredRoles.includes(user.role);
    }
}
