import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const found = await this.usersModel.findOne({ username: username }).exec();
    console.log('found', found);
    return found;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const foundUser = await this.usersModel.findOne({ email: email }).exec();

    return foundUser;
  }
}
