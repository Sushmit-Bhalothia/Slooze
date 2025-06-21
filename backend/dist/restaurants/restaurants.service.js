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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("../entities/restaurant.entity");
const menuitem_entity_1 = require("../entities/menuitem.entity");
let RestaurantsService = class RestaurantsService {
    restaurantRepo;
    menuItemRepo;
    constructor(restaurantRepo, menuItemRepo) {
        this.restaurantRepo = restaurantRepo;
        this.menuItemRepo = menuItemRepo;
    }
    async onModuleInit() {
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
    async findAllByCountry(country) {
        return this.restaurantRepo.find({
            where: { country },
            relations: ['menuItems'],
        });
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(menuitem_entity_1.MenuItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map