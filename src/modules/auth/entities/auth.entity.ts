import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'Example field (placeholder)' })
  access_token: string;
}
