import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG } from 'core/config-keys';

/**
 * By default JwtStrategy is invoked in every request, except by resources
 * with @Public() decorator
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(CONFIG.JWT_SECRET_KEY),
    });
  }

  validate(payload: any) {
    // Logger.debug(payload, 'JwtStrategy');
    return payload;
  }
}
