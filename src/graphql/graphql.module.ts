import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      context: ({ req }) => ({ req }),
      playground: true,
      introspection: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class GraphqlModule {}
