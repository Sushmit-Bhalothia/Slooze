export type UserRole = 'admin' | 'manager' | 'member';
export type UserCountry = 'India' | 'America';
export declare class User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
    country: UserCountry;
}
