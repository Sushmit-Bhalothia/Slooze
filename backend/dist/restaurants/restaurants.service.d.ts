import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { MenuItem } from '../entities/menuitem.entity';
export declare class RestaurantsService implements OnModuleInit {
    private restaurantRepo;
    private menuItemRepo;
    constructor(restaurantRepo: Repository<Restaurant>, menuItemRepo: Repository<MenuItem>);
    onModuleInit(): Promise<void>;
    findAllByCountry(country: string): Promise<Restaurant[]>;
}
