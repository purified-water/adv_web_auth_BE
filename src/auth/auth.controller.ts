import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';

@Controller('')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('user/register')
    signUp(@Body() SignUpDto: SignUpDto) {
        return this.authService.signUp(SignUpDto);
    }

    @Post('user/login')
    login(@Body() SignUpDto: SignUpDto) {
        return this.authService.login(SignUpDto);
    }
}
