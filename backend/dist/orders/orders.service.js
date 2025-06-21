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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const user_entity_1 = require("../entities/user.entity");
const menuitem_entity_1 = require("../entities/menuitem.entity");
let OrdersService = class OrdersService {
    orderRepo;
    userRepo;
    menuItemRepo;
    constructor(orderRepo, userRepo, menuItemRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
        this.menuItemRepo = menuItemRepo;
    }
    async createOrder(userId, itemIds, paymentMethod) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new Error('User not found');
        const items = await this.menuItemRepo.findByIds(itemIds);
        const order = this.orderRepo.create({ user, items, status: 'pending', paymentMethod });
        return this.orderRepo.save(order);
    }
    async placeOrder(orderId) {
        return this.orderRepo.update(orderId, { status: 'placed' });
    }
    async cancelOrder(orderId) {
        return this.orderRepo.update(orderId, { status: 'cancelled' });
    }
    async updatePayment(orderId, paymentMethod) {
        return this.orderRepo.update(orderId, { paymentMethod });
    }
    async getOrdersForUser(user) {
        if (user.role === 'admin') {
            return this.orderRepo.find({ relations: ['user', 'items'] });
        }
        else if (user.role === 'manager') {
            return this.orderRepo
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.user', 'user')
                .leftJoinAndSelect('order.items', 'items')
                .where('user.country = :country', { country: user.country })
                .getMany();
        }
        else {
            return this.orderRepo.find({
                where: { user: { id: user.userId } },
                relations: ['user', 'items'],
            });
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(menuitem_entity_1.MenuItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map