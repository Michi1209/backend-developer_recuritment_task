import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class UsersService {
    
    private readonly users = [
        {
          userId: 1,
          nickname: "luigi",
          full_name: "Luigi Rossi",
          email: "luigi@rossi.com",
          role: [Role.Admin],
          password: "changeme"
        },
        {
          userId: 1,
          nickname: "klausi",
          full_name: "Klaus Stublum",
          email: "klaus.stublum@mail.com",
          role: [Role.User],
          password: "weakpw"
        },
      ];
    
      async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
      }

      findAll(): User[] | PromiseLike<User[]> {
          return this.users;
      } 
}
