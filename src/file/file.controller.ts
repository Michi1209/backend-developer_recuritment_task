import {
    Body,
    Controller,
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
        file: Express.Multer.File,@Request() req) {
            
        this.fileService.upload(file,req.user);
       
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
        file: Express.Multer.File,@Request() req) {
        const user=this.userService.findById(id);
        this.fileService.upload(file,user);
        return "changed"
    }
}
