import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { Role } from 'src/roles/role.enum';
import { FileEntity } from 'src/file/file.entity';

@Injectable()
export class UsersService {
    
    private users : User[] = [
        {
          userId: 1,
          nickname: "luigi",
          full_name: "Luigi Rossi",
          email: "luigi@rossi.com",
          roles: [Role.Admin],
          password: "changeme",
          picture: new FileEntity("nopic")
        },
        {
          userId: 2,
          nickname: "klausi",
          full_name: "Klaus Stublum",
          email: "klaus.stublum@mail.com",
          roles: [Role.User],
          password: "weakpw",
          picture: new FileEntity("nopic")
        },
      ];
    
      async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
      }

      findById(id: number): User | undefined  {
        return this.users.find(user => user.userId === id);
      }

      findAll(): User[] | PromiseLike<User[]> {
          return this.users;
      } 
      
      createUser(user: User) {
        this.users.push(user);
      }

      updateUser(user: User) {
          const updateIdx = this.users.findIndex(u => u.userId === user.userId);
          this.users[updateIdx] = user;
      }
}
