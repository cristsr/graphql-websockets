import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from 'modules/auth/guards/gql-auth.guard';

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
  providers: [
    {
      // By default each resolver uses this guard
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class GraphqlModule {}
