import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(SignUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(LoginDto: LoginDto): Promise<{
        token: string;
        username: string;
    }>;
}
