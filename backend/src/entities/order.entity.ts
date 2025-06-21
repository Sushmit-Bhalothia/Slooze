import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { MenuItem } from './menuitem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => MenuItem)
  @JoinTable()
  items: MenuItem[];

  @Column()
  status: string; // e.g. 'pending', 'placed', 'cancelled'

  @Column()
  paymentMethod: string;
}
