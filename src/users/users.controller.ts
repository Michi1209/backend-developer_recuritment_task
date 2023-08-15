/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller("users")
export class UsersController { 

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Get(':email')
    findOne(@Param('email')
        email: string,
    ) {
      return this.usersService.findOne(email);
    }
}
