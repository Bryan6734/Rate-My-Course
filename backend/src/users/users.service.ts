import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User.name') private userModel: Model<UserDocument>,
  ) { }

  async getUser(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async postUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(user.googleId, user, {
      new: true,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  
}
