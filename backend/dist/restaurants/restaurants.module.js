"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const restaurant_entity_1 = require("../entities/restaurant.entity");
const menuitem_entity_1 = require("../entities/menuitem.entity");
const restaurants_service_1 = require("./restaurants.service");
const restaurants_controller_1 = require("./restaurants.controller");
let RestaurantsModule = class RestaurantsModule {
};
exports.RestaurantsModule = RestaurantsModule;
exports.RestaurantsModule = RestaurantsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([restaurant_entity_1.Restaurant, menuitem_entity_1.MenuItem])],
        providers: [restaurants_service_1.RestaurantsService],
        controllers: [restaurants_controller_1.RestaurantsController],
    })
], RestaurantsModule);
//# sourceMappingURL=restaurants.module.js.map