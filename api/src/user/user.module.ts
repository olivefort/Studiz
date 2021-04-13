import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    /* Import of the Mongoose module */
    MongooseModule.forFeature([{ name: 'user', schema: userSchema }]),

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,  MongooseModule],
})
export class UserModule { }
