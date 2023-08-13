import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService { 
    
    private readonly users = [
        {
          userId: 1,
          username: 'luigi',
          password: 'weakpw',
        },
        {
          userId: 2,
          username: 'klaus',
          password: 'worsepw',
        },
      ];
    
      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}
