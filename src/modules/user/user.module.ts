import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'modules/auth/auth.module';
import { UserResolver } from './resolvers/user.resolver';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
