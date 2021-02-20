import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './auth.resolver';
import { UtilsModule } from 'utils/utils.module';
import { UserModule } from 'modules/user/user.module';
import { CONFIG } from 'config/config-keys';
import { JwtStrategy } from 'modules/auth/strategies/jwt.strategy';
import { GqlAuthGuard } from 'modules/auth/guards/gql-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // Encryption string
        secret: configService.get(CONFIG.JWT_SECRET_KEY),
        signOptions: {
          // Expiration time
          expiresIn: configService.get(CONFIG.JWT_EXPIRATION_TIME),
        },
      }),
    }),
    UtilsModule,
    UserModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}
