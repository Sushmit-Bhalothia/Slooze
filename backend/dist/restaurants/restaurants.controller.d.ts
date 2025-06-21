import { RestaurantsService } from './restaurants.service';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    findAll(req: any): Promise<import("../entities/restaurant.entity").Restaurant[]>;
}
