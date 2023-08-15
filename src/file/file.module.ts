import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [FileController],
  providers: [FileService,UsersService]
})
export class FileModule {}
