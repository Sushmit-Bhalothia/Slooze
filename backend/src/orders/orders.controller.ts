import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  // View orders: admin (all), manager (country), member (own)
  @Get()
  @Roles('admin', 'manager', 'member')
  async getOrders(@Req() req) {
    const user = req.user;
    return this.ordersService.getOrdersForUser(user);
  }
  constructor(private readonly ordersService: OrdersService) {}

  // Create order (all roles, country-filtered)
  @Post()
  @Roles('admin', 'manager', 'member')
  async createOrder(@Req() req, @Body() body: { itemIds: number[]; paymentMethod: string }) {
    const user = req.user;
    // Only allow order creation for menu items in user's country (enforced in frontend, double-check in backend)
    return this.ordersService.createOrder(user.userId, body.itemIds, body.paymentMethod);
  }

  // Place order (admin, manager)
  @Patch(':id/place')
  @Roles('admin', 'manager')
  async placeOrder(@Param('id') id: number) {
    return this.ordersService.placeOrder(id);
  }

  // Cancel order (admin, manager)
  @Patch(':id/cancel')
  @Roles('admin', 'manager')
  async cancelOrder(@Param('id') id: number) {
    return this.ordersService.cancelOrder(id);
  }

  // Update payment method (admin only)
  @Patch(':id/payment')
  @Roles('admin')
  async updatePayment(@Param('id') id: number, @Body() body: { paymentMethod: string }) {
    return this.ordersService.updatePayment(id, body.paymentMethod);
  }
}
