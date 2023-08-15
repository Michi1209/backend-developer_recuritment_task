/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
    upload(file: Express.Multer.File) {
        throw new Error('Method not implemented.');
    }


 }
