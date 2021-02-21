import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'modules/user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'Example field (placeholder)' })
  accessToken: string;

  @Field(() => User)
  user: User;
}
