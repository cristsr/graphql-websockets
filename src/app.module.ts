import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG } from 'core/config-keys';
import { DatabaseModule } from 'database/database.module';
import { GraphqlModule } from 'graphql/graphql.module';
import { AuthModule } from 'modules/auth/auth.module';
import { UserModule } from 'modules/user/user.module';
import { UtilsModule } from 'utils/utils.module';
import { RoomModule } from 'modules/room/room.module';
import { MessagesModule } from 'modules/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GraphqlModule,
    UtilsModule,
    AuthModule,
    UserModule,
    RoomModule,
    MessagesModule,
  ],
})
export class AppModule {
  static port: number;

  constructor(private configService: ConfigService) {
    AppModule.port = +configService.get(CONFIG.PORT);
  }
}
