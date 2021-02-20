import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, {
    description: 'MongoId',
  })
  id: string;

  @Field(() => String, {
    description: 'Name of the user',
  })
  name: string;

  @Field(() => String, {
    description: 'Nickname of the user ',
  })
  nickname: string;

  @Field(() => Int, {
    description: 'Age',
  })
  age: string;

  @Field(() => String, {
    description: 'fake@gmail.com',
  })
  email: string;
}
