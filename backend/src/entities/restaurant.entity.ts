import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from './menuitem.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant)
  menuItems: MenuItem[];
}
