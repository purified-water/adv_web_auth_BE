import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto): Promise<{ token: string }> {
    const { email, username, fullname, password, createdAt } = signUpDto;

    if (!email || !password !== !username) {
      throw new BadRequestException('Email, usename and password are required');
    }

    if (password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }

    const usernameExists = await this.userModel.findOne({ username });
    if (usernameExists) {
      throw new UnauthorizedException('Username already exists');
    }

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      username,
      fullname,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const token = this.jwtService.sign({ email: user.email, id: user._id });

    return { token };
  }

  async login(loginDto): Promise<{ token: string, username: string }> {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ email: user.email, id: user._id });

    return { 
      token: token,
      username: user.username
    };
  }
}
