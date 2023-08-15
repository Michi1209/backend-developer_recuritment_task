import {
    Body,
    Controller,
    Get,
    Param,
    ParseFilePipe,
    ParseFilePipeBuilder,
    ParseIntPipe,
    Post,
    Request,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ResizeImagePipe } from './resize.pipe';
import { FileEntity } from './file.entity';
import { FileService } from './file.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/role.enum';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from 'src/users/user.entity';

@Controller('file')
export class FileController {

  constructor(private readonly fileService: FileService,
    private readonly userService: UsersService) {}

    @Post('upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadOwnProfilePicture(
        @Body() body: FileEntity,
        @UploadedFile(
            ResizeImagePipe
        )
        file: string,@Request() req) {
            
        const user=this.userService.findById(req.user.userId);
        this.fileService.upload(file,user);
       
    }

    
    @Get(':id')
    async findById(@Param('id',ParseIntPipe)
    id: number,): Promise<User> {
      return this.userService.findById(id);
    }

    @Post('upload/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadArbitraryProfilePictureById(
        @Body() body: FileEntity,@Param('id',ParseIntPipe)
        id: number,
        @UploadedFile(
            ResizeImagePipe
        )
        file: string,@Request() req) {
        const user=this.userService.findById(id);
        this.fileService.upload(file,user);
        return "admin changed profile pic for "+ user.email;
    }
}
