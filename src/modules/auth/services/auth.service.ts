import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'utils/bcrypt/bcrypt.service';
import { UserService } from 'modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private bcrypt: BcryptService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isMatch = await this.bcrypt.match(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async createJwt(user: any) {
    Logger.log(user, 'AuthService.createUser');
    return {
      access_token: this.jwtService.sign(user),
      user,
    };
  }
}
