import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Seed initial users if not present
    const count = await this.usersRepository.count();
    if (count === 0) {
      const users = [
        { username: 'nick', password: await bcrypt.hash('admin123', 10), role: 'admin' as 'admin', country: 'America' as 'America' },
        { username: 'marvel', password: await bcrypt.hash('manager123', 10), role: 'manager' as 'manager', country: 'India' as 'India' },
        { username: 'america', password: await bcrypt.hash('manager123', 10), role: 'manager' as 'manager', country: 'America' as 'America' },
        { username: 'thanos', password: await bcrypt.hash('member123', 10), role: 'member' as 'member', country: 'India' as 'India' },
        { username: 'thor', password: await bcrypt.hash('member123', 10), role: 'member' as 'member', country: 'India' as 'India' },
        { username: 'travis', password: await bcrypt.hash('member123', 10), role: 'member' as 'member', country: 'America' as 'America' },
      ];
      for (const user of users) {
        await this.usersRepository.save(user);
      }
    }
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
}
