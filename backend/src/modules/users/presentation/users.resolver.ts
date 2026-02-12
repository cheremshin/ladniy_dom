import { Args, Context, ID, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from '../domain/users.service';
import { UserFilterArgs } from './dto/user-filter.args';
import {
    CreateUserInput,
    RegisterUserInputPublic,
    UpdateUserInput,
    UpdateUserInputPublic,
} from './dto/user.input';
import { buildPaginatedResponse } from '@/common/presentation/utils/pagination.helper';
import { Paginated } from '@/common/presentation/dto/paginated.response';
import { RequireAdmin } from '@/modules/auth/decorators/require-admin.decorator';
import { SessionGuard } from '@/modules/auth/guards/session.guard';
import { BadRequestException, ForbiddenException, UseGuards } from '@nestjs/common';
import { GqlContext } from '@/common/presentation/dto/gql.context';
import { UserFavourite, UserFavourites } from './entities/user-favourites.entity';
import { UserFavouritesService } from '../domain/favourites.service';
import { ToggleUserFavouriteArgs, UserFavouritesArgs } from './dto/user-favourites-filter.args';

@ObjectType()
class PaginatedUsers extends Paginated(User) {}

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly favouritesService: UserFavouritesService,
    ) {}

    @Query(() => PaginatedUsers, { name: 'users' })
    @RequireAdmin()
    async getUsers(@Args({ nullable: true }) filters?: UserFilterArgs): Promise<PaginatedUsers> {
        const { page = 1, limit, ...serviceFilters } = filters || {};

        if (limit == null) {
            const result = await this.usersService.findAll(serviceFilters);
            const total = result.total;
            return {
                items: result.items as User[],
                meta: {
                    total,
                    page: 1,
                    limit: total,
                    totalPages: total > 0 ? 1 : 0,
                    hasNextPage: false,
                    hasPrevPage: false,
                },
            };
        }

        const offset = (page - 1) * limit;
        const result = await this.usersService.findAll(serviceFilters, offset, limit);
        return buildPaginatedResponse<User>(
            { items: result.items as User[], total: result.total },
            page,
            limit,
        );
    }

    @Query(() => User, { name: 'user' })
    @UseGuards(SessionGuard)
    async getUser(
        @Args('id', { type: () => ID }) id: string,
        @Context() context: GqlContext,
    ): Promise<User> {
        const session = context.req.session;
        if (session?.user?.userId !== id && session?.user?.role !== 'admin') {
            throw new ForbiddenException('Access denied');
        }

        return this.usersService.findOne(id) as Promise<User>;
    }

    @Query(() => User, { name: 'me' })
    @UseGuards(SessionGuard)
    async getMe(@Context() context: GqlContext): Promise<User> {
        const session = context.req.session;
        if (!session?.user?.userId) {
            throw new ForbiddenException('Access denied');
        }

        return this.usersService.findOne(session.user.userId);
    }

    @Query(() => UserFavourites, { name: 'favourites' })
    @UseGuards(SessionGuard)
    async getUserFavourites(
        @Context() context: GqlContext,
        @Args({ nullable: true }) filters?: UserFavouritesArgs,
    ): Promise<UserFavourites> {
        const session = context.req.session;
        if (!session?.user?.userId && session?.user?.role !== 'admin') {
            throw new ForbiddenException('Access denied');
        }

        const userId = filters?.userId ?? session.user.userId;
        return {
            items: (await this.favouritesService.getUserFavourites({ userId })).items.map(
                (item) =>
                    ({
                        id: item.id,
                        userId: item.userId,
                        productId: item.productId,
                    }) as UserFavourite,
            ),
        };
    }

    @Mutation(() => UserFavourite)
    @UseGuards(SessionGuard)
    async toggleUserFavourite(
        @Args() input: ToggleUserFavouriteArgs,
        @Context() context: GqlContext,
    ): Promise<UserFavourite> {
        const session = context.req.session;
        const isAdmin = session?.user?.role === 'admin';
        const sessionUserId = session?.user?.userId;

        if (!isAdmin) {
            if (input.userId !== undefined && input.userId !== sessionUserId) {
                throw new ForbiddenException('Access denied');
            }

            if (input.userId === undefined && !sessionUserId) {
                throw new ForbiddenException('Access denied');
            }
        } else if (!input.userId) {
            throw new BadRequestException('userId is required');
        }

        return this.favouritesService.toggleUserFavourite({
            userId: input.userId ?? sessionUserId!,
            productId: input.productId,
        });
    }

    @Mutation(() => User)
    @RequireAdmin()
    async createUser(@Args('input') input: CreateUserInput): Promise<User> {
        const { password, ...rest } = input;
        return this.usersService.create({
            ...rest,
            password,
            role: input.role as 'customer' | 'admin',
        }) as Promise<User>;
    }

    @Mutation(() => User)
    async register(@Args('input') input: RegisterUserInputPublic): Promise<User> {
        return this.usersService.create({
            email: input.email,
            password: input.password,
        }) as Promise<User>;
    }

    @Mutation(() => User)
    @RequireAdmin()
    async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
        const { id, newPassword, ...data } = input;
        return this.usersService.update(id, {
            ...data,
            newPassword,
            role: data.role as 'customer' | 'admin' | undefined,
        }) as Promise<User>;
    }

    @Mutation(() => User)
    @UseGuards(SessionGuard)
    async updateProfileInfo(
        @Args('input') input: UpdateUserInputPublic,
        @Context() context: GqlContext,
    ): Promise<User> {
        const { id, ...data } = input;
        const session = context.req.session;
        if (session?.user?.userId !== id && session?.user?.role !== 'admin') {
            throw new ForbiddenException('Access denied');
        }

        return this.usersService.update(id, { ...data });
    }

    @Mutation(() => User)
    @RequireAdmin()
    async softDeleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
        return this.usersService.softDelete(id) as Promise<User>;
    }

    @Mutation(() => User)
    @RequireAdmin()
    async restoreUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
        return this.usersService.restore(id) as Promise<User>;
    }
}
