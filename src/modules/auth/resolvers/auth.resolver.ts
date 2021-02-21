import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'core/decorators/public';
import { User } from 'modules/user/entities/user.entity';
import { CreateUserInput } from 'modules/user/dto/create-user.input';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../dto/login.input';
import { Auth } from '../entities/auth.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  register(@Args('userInput') userInput: CreateUserInput) {
    return this.authService.register(userInput);
  }

  @Public()
  @Mutation(() => Auth)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
