import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { MenuItem } from '../entities/menuitem.entity';

@Injectable()
export class RestaurantsService implements OnModuleInit {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
  ) {}

  async onModuleInit() {
    // Seed initial restaurants and menu items if not present
    const count = await this.restaurantRepo.count();
    if (count === 0) {
      const india = await this.restaurantRepo.save({ name: 'Delhi Spice', country: 'India' });
      const america = await this.restaurantRepo.save({ name: 'NYC Diner', country: 'America' });
      await this.menuItemRepo.save([
        { name: 'Butter Chicken', price: 10, restaurant: india },
        { name: 'Paneer Tikka', price: 8, restaurant: india },
        { name: 'Cheeseburger', price: 12, restaurant: america },
        { name: 'Pancakes', price: 7, restaurant: america },
      ]);
    }
  }

  async findAllByCountry(country: string) {
    return this.restaurantRepo.find({
      where: { country },
      relations: ['menuItems'],
    });
  }
}
