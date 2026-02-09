import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../domain/auth.service';
import { LoginInput } from './dto/auth.input';
import { GqlContext } from '@/common/presentation/dto/gql.context';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => String)
    async login(@Args('input') input: LoginInput, @Context() context: GqlContext): Promise<string> {
        await this.authService.login(input, context.req, context.res);
        return 'Login successful';
    }

    @Mutation(() => String)
    async logout(@Context() context: GqlContext): Promise<string> {
        await this.authService.logout(context.req, context.res);
        return 'Logout successful';
    }
}
