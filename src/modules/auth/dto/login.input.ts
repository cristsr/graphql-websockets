import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'Email (placeholder)' })
  email: string;

  @Field(() => String, { description: 'Email (placeholder)' })
  password: string;
}
