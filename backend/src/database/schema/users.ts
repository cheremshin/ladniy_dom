import {
    boolean,
    check,
    index,
    integer,
    timestamp,
    unique,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { pgTable, pgEnum } from 'drizzle-orm/pg-core';
import { generateNickname } from '@/database/utils/generate-nickname';
import { sql } from 'drizzle-orm';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';

export const userRoleEnum = pgEnum('user_role', ['customer', 'admin']);

export const users = pgTable(
    'users',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        email: varchar('email', { length: 100 }).notNull(),
        passwordHash: varchar('password_hash', { length: 128 }).notNull(),

        firstName: varchar('first_name', { length: 50 }),
        lastName: varchar('last_name', { length: 50 }),
        nickname: varchar('nickname', { length: 50 })
            .$default(() => generateNickname())
            .notNull(),

        phone: varchar('phone', { length: 15 }),

        role: userRoleEnum('role').default('customer').notNull(),
        isActive: boolean('is_active').default(true).notNull(),

        lastLogin: timestamp('last_login', { mode: 'string' }),
        failedLoginAttempts: integer('failed_login_attempts').default(0).notNull(),

        passwordResetToken: varchar('password_reset_token', { length: 128 }),
        passwordResetTokenExpires: timestamp('password_reset_token_expires', { mode: 'string' }),

        tempVerificationCode: varchar('temp_verification_code', { length: 6 }),
        tempCodeExpires: timestamp('temp_code_expires', { mode: 'string' }),

        createdAt: timestampDefaultNow('created_at'),
        updatedAt: timestampDefaultNow('updated_at'),
        deletedAt: timestamp('deleted_at', { mode: 'date' }),
    },
    (table) => [
        unique('users_email_key').on(table.email),
        unique('users_nickname_key').on(table.nickname),

        check('email_check', sql`(email)::text <> ''::text`),
        check('password_hash_check', sql`(password_hash)::text <> ''::text`),
        check('role_check', sql`role = ANY(ARRAY['customer'::user_role, 'admin'::user_role])`),
        check(
            'failed_login_attempts_check',
            sql`failed_login_attempts >= 0 AND failed_login_attempts <= 3`,
        ),
        notInFutureCheck('created_at'),
        notInFutureCheck('updated_at'),

        index('users_email_index').on(table.email),
    ],
);
