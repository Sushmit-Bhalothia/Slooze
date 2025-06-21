import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { MenuItem } from '../entities/menuitem.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
  ) {}

  async createOrder(userId: number, itemIds: number[], paymentMethod: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const items = await this.menuItemRepo.findByIds(itemIds);
    const order = this.orderRepo.create({ user, items, status: 'pending', paymentMethod });
    return this.orderRepo.save(order);
  }

  async placeOrder(orderId: number) {
    return this.orderRepo.update(orderId, { status: 'placed' });
  }

  async cancelOrder(orderId: number) {
    return this.orderRepo.update(orderId, { status: 'cancelled' });
  }

  async updatePayment(orderId: number, paymentMethod: string) {
    return this.orderRepo.update(orderId, { paymentMethod });
  }

  async getOrdersForUser(user: any) {
    if (user.role === 'admin') {
      return this.orderRepo.find({ relations: ['user', 'items'] });
    } else if (user.role === 'manager') {
      // Managers see all orders for their country
      return this.orderRepo
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.items', 'items')
        .where('user.country = :country', { country: user.country })
        .getMany();
    } else {
      // Members see only their own orders
      return this.orderRepo.find({
        where: { user: { id: user.userId } },
        relations: ['user', 'items'],
      });
    }
  }
}
