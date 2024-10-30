import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(SignUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(SignUpDto: SignUpDto): Promise<{
        token: string;
    }>;
}
