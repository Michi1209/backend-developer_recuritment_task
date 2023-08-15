import {
    Body,
    Controller,
    ParseFilePipe,
    ParseFilePipeBuilder,
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

@Controller('file')
export class FileController {

  constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadFileAndPassValidation(
        @Body() body: FileEntity,
        @UploadedFile(
            ResizeImagePipe
        )
        file: Express.Multer.File,@Request() req) {
            
        if(req.user.role.includes(Role.Admin)){    
            this.fileService.upload(file,req.user);
        } else {
            throw new UnauthorizedException("Only admins can upload profile picture");
        }
    }

}
