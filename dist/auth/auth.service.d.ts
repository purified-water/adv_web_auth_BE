import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp(signUpDto: any): Promise<{
        token: string;
    }>;
    login(loginDto: any): Promise<{
        token: string;
    }>;
}
