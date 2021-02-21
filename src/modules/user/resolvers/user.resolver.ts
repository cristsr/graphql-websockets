import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'modules/auth/decorators/current-user';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UpdateUserInput } from '../dto/update-user.input';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@CurrentUser() user: any) {
    Logger.log(user, 'UserResolver.findOne');
    return user;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }
}
