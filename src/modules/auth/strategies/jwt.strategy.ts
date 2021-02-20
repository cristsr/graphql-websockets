import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG } from 'config/config-keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(CONFIG.JWT_SECRET_KEY),
    });
  }

  /**
   * Callback used by passport before call all protected controller
   * and it returns a model with information signed in jwt
   * @param payload
   */
  async validate(payload: any) {
    Logger.debug(payload, 'JwtStrategy.validate');
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}
