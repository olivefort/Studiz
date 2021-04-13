import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import { UserUpdateDTO } from './user.dto.update';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly user: Model<User>,
    ) { }

  /**
   * get all user from db
   */
  async getAll(): Promise<User[]> {
    return await this.user.find().exec();
  }

   /**
    * get user by ID
    * @param id , id of user
    */
  async getUserById(id): Promise<User> {
    const user = await this.user.findById({ _id: new ObjectId(id) });
    if (!user) throw new NotFoundException();
    return user;
  }

   /**
    * Create user
    */
  create(): Promise<User> {
    const user = new this.user();
    return user.save();
  }

   /**
    * update user
    * @param idUser
    * @param userUpdateDTO
    */
  async update(idUser: string, userUpdateDTO: UserUpdateDTO): Promise<User> {
    const user = await this.user.findByIdAndUpdate(idUser, userUpdateDTO, {
      new: true,
    });
    if (!user) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
