import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
  restaurant: Restaurant;
}
