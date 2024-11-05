import { User } from './schema/user.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    getInfo(id: string): Promise<User>;
}
