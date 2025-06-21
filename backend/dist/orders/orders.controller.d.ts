import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    getOrders(req: any): Promise<import("../entities/order.entity").Order[]>;
    constructor(ordersService: OrdersService);
    createOrder(req: any, body: {
        itemIds: number[];
        paymentMethod: string;
    }): Promise<import("../entities/order.entity").Order>;
    placeOrder(id: number): Promise<import("typeorm").UpdateResult>;
    cancelOrder(id: number): Promise<import("typeorm").UpdateResult>;
    updatePayment(id: number, body: {
        paymentMethod: string;
    }): Promise<import("typeorm").UpdateResult>;
}
