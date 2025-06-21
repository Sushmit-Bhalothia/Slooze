import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { MenuItem } from '../entities/menuitem.entity';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, MenuItem])],
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
