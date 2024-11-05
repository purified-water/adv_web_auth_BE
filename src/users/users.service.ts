import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async getInfo(id: string): Promise<User> {
        const user = await this.userModel.findById(id).select('email username fullname createdAt').exec();

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}
