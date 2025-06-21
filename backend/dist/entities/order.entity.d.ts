import { User } from './user.entity';
import { MenuItem } from './menuitem.entity';
export declare class Order {
    id: number;
    user: User;
    items: MenuItem[];
    status: string;
    paymentMethod: string;
}
