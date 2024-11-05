"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { email, username, fullname, password, createdAt } = signUpDto;
        if (!email || !password !== !username) {
            throw new common_1.BadRequestException('Email, usename and password are required');
        }
        if (password.length < 6) {
            throw new common_1.BadRequestException('Password must be at least 6 characters long');
        }
        const usernameExists = await this.userModel.findOne({ username });
        if (usernameExists) {
            throw new common_1.UnauthorizedException('Username already exists');
        }
        const userExists = await this.userModel.findOne({ email });
        if (userExists) {
            throw new common_1.UnauthorizedException('User already exists');
        }
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
    async login(loginDto) {
        const { email, password } = loginDto;
        if (!email || !password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const token = this.jwtService.sign({ email: user.email, id: user._id });
        return {
            token: token,
            username: user.username
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map