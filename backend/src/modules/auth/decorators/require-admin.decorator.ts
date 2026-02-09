import { applyDecorators, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../guards/session.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export const RequireAdmin = () =>
    applyDecorators(UseGuards(SessionGuard, RolesGuard), Roles('admin'));
