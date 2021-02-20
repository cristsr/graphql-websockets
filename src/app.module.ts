import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'database/database.module';
import { CONFIG } from 'config/config-keys';
import { AuthModule } from 'modules/auth/auth.module';
import { UserModule } from 'modules/user/user.module';
import { UtilsModule } from 'utils/utils.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from 'modules/auth/guards/gql-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    }),
    DatabaseModule,
    UtilsModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      //by default each controller uses this guard
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {
  static port: number;

  constructor(private configService: ConfigService) {
    AppModule.port = +configService.get(CONFIG.PORT);
  }
}
