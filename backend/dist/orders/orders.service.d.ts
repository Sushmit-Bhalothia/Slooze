import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { MenuItem } from '../entities/menuitem.entity';
export declare class OrdersService {
    private orderRepo;
    private userRepo;
    private menuItemRepo;
    constructor(orderRepo: Repository<Order>, userRepo: Repository<User>, menuItemRepo: Repository<MenuItem>);
    createOrder(userId: number, itemIds: number[], paymentMethod: string): Promise<Order>;
    placeOrder(orderId: number): Promise<import("typeorm").UpdateResult>;
    cancelOrder(orderId: number): Promise<import("typeorm").UpdateResult>;
    updatePayment(orderId: number, paymentMethod: string): Promise<import("typeorm").UpdateResult>;
    getOrdersForUser(user: any): Promise<Order[]>;
}
