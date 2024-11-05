import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getInfo(id: string): Promise<import("./schema/user.schema").User>;
}
