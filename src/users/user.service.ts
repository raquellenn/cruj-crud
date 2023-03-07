import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find().exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async create(userDto: UserDto) {
    const user = new User(userDto.name, userDto.email);
    const existingUser = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async update(id: string, user: UserDto) {
    await this.userModel.updateOne({ _id: id }, user).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec();
  }
}
