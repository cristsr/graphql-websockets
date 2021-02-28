import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'modules/user/entities/user.entity';

@ObjectType()
export class Room {
  @Field({ description: 'Name of the room' })
  name: string;

  @Field(() => User, { description: 'Room creator' })
  user: User;
}
