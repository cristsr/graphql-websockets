import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description: 'Name (cristian stiven p)',
  })
  name: string;

  @Field(() => String, {
    description: 'Nickname (csrex)',
  })
  nickname: string;

  @Field(() => Int, {
    description: 'Age (22)',
  })
  age: string;

  @Field(() => String, {
    description: 'email (jhon@gmail.com)',
  })
  email: string;

  @Field(() => String, {
    description: 'password (1234pass.)',
  })
  password: string;
}
