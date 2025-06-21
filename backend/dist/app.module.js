"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./entities/user.entity");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const menuitem_entity_1 = require("./entities/menuitem.entity");
const order_entity_1 = require("./entities/order.entity");
const users_module_1 = require("./users/users.module");
const restaurants_module_1 = require("./restaurants/restaurants.module");
const menuitems_module_1 = require("./menuitems/menuitems.module");
const orders_module_1 = require("./orders/orders.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [user_entity_1.User, restaurant_entity_1.Restaurant, menuitem_entity_1.MenuItem, order_entity_1.Order],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, restaurant_entity_1.Restaurant, menuitem_entity_1.MenuItem, order_entity_1.Order]),
            users_module_1.UsersModule,
            restaurants_module_1.RestaurantsModule,
            menuitems_module_1.MenuitemsModule,
            orders_module_1.OrdersModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map