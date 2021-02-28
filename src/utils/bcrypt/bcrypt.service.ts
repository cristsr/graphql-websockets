import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from 'core/config-keys';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltOrRounds = this.config.get(CONFIG.BCRYPT_SALT_OR_ROUNDS);

  constructor(private config: ConfigService) {}

  async hash(str: string | number): Promise<string> {
    try {
      return await bcrypt.hash(str, +this.saltOrRounds);
    } catch (e) {
      Logger.error(
        'Could not generate the hash',
        e.message,
        'BcryptService.hash',
      );

      throw new InternalServerErrorException(e.message);
    }
  }

  async match(str: string | number, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(str, hash);
    } catch (e) {
      Logger.error(
        `it was not possible to validate the given string`,
        e.message,
        'BcryptService.match',
      );

      throw new InternalServerErrorException(e.message);
    }
  }
}
