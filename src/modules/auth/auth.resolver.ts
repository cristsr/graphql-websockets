import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  GqlExecutionContext,
} from '@nestjs/graphql';
import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { Public } from './decorators/public';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request.user;
  },
);

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => Auth)
  // createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
  //   return this.authService.create(createAuthInput);
  // }

  @Public()
  @Mutation(() => Auth, { name: 'login' })
  login(@Args('loginInput') loginInput: LoginInput) {
    Logger.log(loginInput, 'AuthResolver');
    return this.authService.createJwt(loginInput);
  }

  @Query(() => Auth)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: Auth) {
    return {
      access_token: 'asdsad',
    };
  }

  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }
  //
  // @Mutation(() => Auth)
  // removeAuth(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.remove(id);
  // }
}
