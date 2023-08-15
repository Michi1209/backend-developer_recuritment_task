import {
    Body,
    Controller,
    ParseFilePipe,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ResizeImagePipe } from './resize.pipe';
import { FileEntity } from './file.entity';
import { FileService } from './file.service';

@Controller('file')
export class FileController {

  constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileAndPassValidation(
        @Body() body: FileEntity,
        @UploadedFile(
            ResizeImagePipe
        )
        file: Express.Multer.File,) {
        this.fileService.upload(file);
    }

}
