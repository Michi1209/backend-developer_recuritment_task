/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class FileService {
    upload(file: Express.Multer.File,user: User) {
        user.picture=file;
    }


 }
