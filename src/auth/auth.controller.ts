import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    signUp(@Body() SignUpDto: SignUpDto) {
        return this.authService.signUp(SignUpDto);
    }

    @Post('login')
    login(@Body() LoginDto: LoginDto) {
        return this.authService.login(LoginDto);
    }
}
