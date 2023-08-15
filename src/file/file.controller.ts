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
import { ResizeImagePipe } from './sharppipe.pipe';
import { FileEntity } from './file.entity';

@Controller('file')
export class FileController {


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileAndPassValidation(
        @Body() body: FileEntity,
        @UploadedFile(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
              fileType: 'jpg',
            })
            .build(),
            ResizeImagePipe
        )
        file: Express.Multer.File,) {
        console.log(file);
    }

}
