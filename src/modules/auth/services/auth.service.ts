import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'utils/bcrypt/bcrypt.service';
import { UserService } from 'modules/user/services/user.service';
import { CreateUserInput } from 'modules/user/dto/create-user.input';
import { LoginInput } from '../dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private bcrypt: BcryptService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(userInput: CreateUserInput) {
    const user = await this.userService.findByEmail(userInput.email);

    if (user) {
      Logger.log(`${user.email} already exist `, 'AuthService.register');
      throw new NotFoundException('Email already exists');
    }

    userInput.password = await this.bcrypt.hash(userInput.password);
    Logger.log(`Register ${user.email} was successfully`, 'AuthService.login');
    return this.userService.create(userInput);
  }

  async login({ email, password }: LoginInput) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await this.bcrypt.match(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    const result = {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      nickname: user.nickname,
    };

    Logger.log(`Login ${user.email} was successfully`, 'AuthService.login');

    return {
      accessToken: this.jwtService.sign(result),
      user: result,
    };
  }
}
