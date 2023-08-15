/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Controller("users")
export class UsersController { 

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id',ParseIntPipe)
    id: number,): Promise<User> {
      return this.usersService.findById(id);
    }
    
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto){
      return this.usersService.createUser(createUserDto);
    }


    @Post('update')
    async update(@Body() createUserDto: CreateUserDto){
      return this.usersService.updateUser(createUserDto);
    }

    @Get(':email')
    findOne(@Param('email')
        email: string,
    ) {
      return this.usersService.findOne(email);
    }
}
