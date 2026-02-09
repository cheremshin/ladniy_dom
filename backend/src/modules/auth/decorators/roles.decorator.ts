import { userRoleEnum } from '@/database/schema/users';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
type UserRole = (typeof userRoleEnum.enumValues)[number];
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
