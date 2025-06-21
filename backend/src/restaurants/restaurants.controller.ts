import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('restaurants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @Roles('admin', 'manager', 'member')
  async findAll(@Req() req) {
    const user = req.user;
    return this.restaurantsService.findAllByCountry(user.country);
  }
}
