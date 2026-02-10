import { DATABASE_CONNECTION } from '@/database/database.provider';
import { Database } from '@/database/database.types';
import { users } from '@/database/schema';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ListResult } from '@/common/domain/list-result.type';
import { and, asc, count, eq, ilike, or, SQL, sql } from 'drizzle-orm';
import { hash } from 'bcrypt';

export type UserRecord = typeof users.$inferSelect;

export type UserFilters = {
    search?: string;
    role?: 'customer' | 'admin';
    includeInactive?: boolean;
};

export type CreateUserData = {
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    nickname?: string | null;
    phone?: string | null;
    role?: 'customer' | 'admin';
    isActive?: boolean;
};

export type UpdateUserData = Partial<Omit<CreateUserData, 'password'> & { newPassword?: string }>;

@Injectable()
export class UsersService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: Database,
    ) {}

    async findAll(
        filters: UserFilters,
        offset: number = 0,
        limit?: number,
    ): Promise<ListResult<UserRecord>> {
        const conditions = this.buildFilterConditions(filters);
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [items, [{ total }]] = await Promise.all([
            (() => {
                const query = this.db
                    .select()
                    .from(users)
                    .where(whereClause)
                    .orderBy(asc(users.createdAt));

                if (limit !== undefined) {
                    return query.limit(limit).offset(offset);
                }
                return query;
            })(),
            this.db.select({ total: count() }).from(users).where(whereClause),
        ]);

        return { items, total };
    }

    async findOne(id: string): Promise<UserRecord> {
        const [user] = await this.db.select().from(users).where(eq(users.id, id)).limit(1);

        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }

        return user;
    }

    async findByEmail(email: string): Promise<UserRecord | null> {
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.email, email.toLowerCase()))
            .limit(1);

        return user ?? null;
    }

    async create(data: CreateUserData): Promise<UserRecord> {
        return this.db.transaction(async (tx) => {
            const emailLower = data.email.trim().toLowerCase();
            const existingByEmail = await tx
                .select({ id: users.id })
                .from(users)
                .where(eq(users.email, emailLower))
                .limit(1);

            if (existingByEmail.length > 0) {
                throw new ConflictException(`User with email "${data.email}" already exists`);
            }

            if (data.nickname?.trim()) {
                const existingByNickname = await tx
                    .select({ id: users.id })
                    .from(users)
                    .where(eq(users.nickname, data.nickname.trim()))
                    .limit(1);
                if (existingByNickname.length > 0) {
                    throw new ConflictException(
                        `User with nickname "${data.nickname}" already exists`,
                    );
                }
            }

            const passwordHash = await hash(data.password, 12);

            const insertValues: Record<string, unknown> = {
                email: emailLower,
                passwordHash,
                firstName: data.firstName?.trim() ?? null,
                lastName: data.lastName?.trim() ?? null,
                phone: data.phone?.trim() ?? null,
                role: data.role ?? 'customer',
                isActive: data.isActive ?? true,
            };
            if (data.nickname?.trim()) {
                insertValues.nickname = data.nickname.trim();
            }

            const [created] = await tx
                .insert(users)
                .values(insertValues as typeof users.$inferInsert)
                .returning();

            return created;
        });
    }

    async update(id: string, data: UpdateUserData): Promise<UserRecord> {
        return this.db.transaction(async (tx) => {
            await this.findOne(id);

            if (data.email !== undefined) {
                const emailLower = data.email.trim().toLowerCase();
                const existing = await tx
                    .select({ id: users.id })
                    .from(users)
                    .where(and(eq(users.email, emailLower), sql`${users.id} != ${id}`))
                    .limit(1);
                if (existing.length > 0) {
                    throw new ConflictException(`User with email "${data.email}" already exists`);
                }
            }

            if (data.nickname?.trim()) {
                const existing = await tx
                    .select({ id: users.id })
                    .from(users)
                    .where(and(eq(users.nickname, data.nickname.trim()), sql`${users.id} != ${id}`))
                    .limit(1);
                if (existing.length > 0) {
                    throw new ConflictException(
                        `User with nickname "${data.nickname}" already exists`,
                    );
                }
            }

            const updatePatch: Partial<typeof users.$inferInsert> = {};
            if (data.email !== undefined) updatePatch.email = data.email.trim().toLowerCase();
            if (data.firstName !== undefined)
                updatePatch.firstName = data.firstName?.trim() ?? null;
            if (data.lastName !== undefined) updatePatch.lastName = data.lastName?.trim() ?? null;
            if (data.nickname !== undefined)
                updatePatch.nickname = data.nickname?.trim() ?? undefined;
            if (data.phone !== undefined) updatePatch.phone = data.phone?.trim() ?? null;
            if (data.role !== undefined) updatePatch.role = data.role;
            if (data.isActive !== undefined) updatePatch.isActive = data.isActive;

            if (data.newPassword) {
                updatePatch.passwordHash = await hash(data.newPassword, 12);
            }

            if (Object.keys(updatePatch).length === 0) {
                return this.findOne(id);
            }

            const [updated] = await tx
                .update(users)
                .set(updatePatch)
                .where(eq(users.id, id))
                .returning();

            return updated;
        });
    }

    async softDelete(id: string): Promise<UserRecord> {
        const user = await this.findOne(id);
        const [updated] = await this.db
            .update(users)
            .set({ isActive: false, deletedAt: new Date() })
            .where(eq(users.id, id))
            .returning();
        return updated ?? user;
    }

    async restore(id: string): Promise<UserRecord> {
        await this.findOne(id);
        const [restored] = await this.db
            .update(users)
            .set({ isActive: true, deletedAt: null })
            .where(eq(users.id, id))
            .returning();
        if (!restored) throw new NotFoundException(`User with ID "${id}" not found`);
        return restored;
    }

    private buildFilterConditions(filters: UserFilters): SQL[] {
        const conditions: SQL[] = [];

        if (filters.includeInactive === false) {
            conditions.push(eq(users.isActive, true));
        }

        if (filters.role !== undefined) {
            conditions.push(eq(users.role, filters.role));
        }

        if (filters.search?.trim()) {
            const term = `%${filters.search.trim()}%`;
            conditions.push(or(ilike(users.email, term), ilike(users.nickname, term)) as SQL);
        }

        return conditions;
    }
}
