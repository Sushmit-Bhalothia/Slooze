import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'admin' | 'manager' | 'member';
export type UserCountry = 'India' | 'America';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'varchar' })
  role: UserRole;

  @Column({ type: 'varchar' })
  country: UserCountry;
}
