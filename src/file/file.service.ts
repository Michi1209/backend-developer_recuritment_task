/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { FileEntity } from './file.entity';

@Injectable()
export class FileService {

    constructor(private userService: UsersService) { }


    upload(file: string,user: User) {
        user.picture = new FileEntity(file);
        this.userService.updateUser(user);
    }


 }
