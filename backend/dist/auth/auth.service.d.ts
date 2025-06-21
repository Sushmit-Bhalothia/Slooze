import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<{
        id: number;
        username: string;
        role: import("../entities/user.entity").UserRole;
        country: import("../entities/user.entity").UserCountry;
    } | null>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            username: any;
            sub: any;
            role: any;
            country: any;
        };
    }>;
}
