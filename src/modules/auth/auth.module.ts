import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { CONFIG } from 'core/config-keys';
import { AuthService } from './services/auth.service';
import { UtilsModule } from 'utils/utils.module';
import { UserModule } from 'modules/user/user.module';
import { JwtStrategy } from 'modules/auth/strategies/jwt.strategy';
import { AuthResolver } from './resolvers/auth.resolver';
import { APP_GUARD } from '@nestjs/core';
import { GqlJwtAuthGuard } from 'modules/auth/guards/gql-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(CONFIG.JWT_SECRET_KEY), // Encryption string
        signOptions: {
          expiresIn: configService.get(CONFIG.JWT_EXPIRATION_TIME), // Expiration time
        },
      }),
    }),
    UtilsModule,
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    {
      provide: APP_GUARD, // By default each resolver uses this guard
      useClass: GqlJwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
