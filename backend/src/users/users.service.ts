import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User.name') private userModel: Model<UserDocument>,
  ) {}

  async getUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByGoogleId(googleId: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findOne({ googleId: googleId }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async postUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(id: string, user: User): Promise<User> {
    let updatedUser;

    try {
      updatedUser = await this.userModel.findById(id).exec();

    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    if (!updatedUser) {
      throw new NotFoundException('Could not find user.');
    }

    updatedUser = Object.assign(updatedUser, user);

    return updatedUser.save();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
