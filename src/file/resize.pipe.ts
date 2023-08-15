/*
https://docs.nestjs.com/pipes
*/

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class ResizeImagePipe implements PipeTransform<Express.Multer.File, Promise<string>>  {
  async transform(image: Express.Multer.File): Promise<string>  {
    const originalName = path.parse(image.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';
    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join('uploads', filename));

      return filename;
  }
}
