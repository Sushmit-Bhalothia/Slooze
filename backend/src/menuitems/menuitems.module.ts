import { Module } from '@nestjs/common';
import { MenuitemsService } from './menuitems.service';
import { MenuitemsController } from './menuitems.controller';

@Module({
  providers: [MenuitemsService],
  controllers: [MenuitemsController]
})
export class MenuitemsModule {}
