import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Restaurant } from './entities/restaurant.entity';
import { MenuItem } from './entities/menuitem.entity';
import { Order } from './entities/order.entity';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenuitemsModule } from './menuitems/menuitems.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Restaurant, MenuItem, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Restaurant, MenuItem, Order]),
    UsersModule,
    RestaurantsModule,
    MenuitemsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
