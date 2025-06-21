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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async onModuleInit() {
        const count = await this.usersRepository.count();
        if (count === 0) {
            const users = [
                { username: 'nick', password: await bcrypt.hash('admin123', 10), role: 'admin', country: 'America' },
                { username: 'marvel', password: await bcrypt.hash('manager123', 10), role: 'manager', country: 'India' },
                { username: 'america', password: await bcrypt.hash('manager123', 10), role: 'manager', country: 'America' },
                { username: 'thanos', password: await bcrypt.hash('member123', 10), role: 'member', country: 'India' },
                { username: 'thor', password: await bcrypt.hash('member123', 10), role: 'member', country: 'India' },
                { username: 'travis', password: await bcrypt.hash('member123', 10), role: 'member', country: 'America' },
            ];
            for (const user of users) {
                await this.usersRepository.save(user);
            }
        }
    }
    async findByUsername(username) {
        return this.usersRepository.findOne({ where: { username } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map