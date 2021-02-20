import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.userModel.create(createUserInput);
    console.log(user.id);
    return user;
  }

  findAll() {
    return [
      {
        id: '123',
        name: 'test',
        nickname: 'nickname',
        email: 'fake123',
        age: 22,
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
