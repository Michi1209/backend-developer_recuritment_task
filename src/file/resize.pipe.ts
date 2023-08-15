/*
https://docs.nestjs.com/pipes
*/

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import path from 'path';
import sharp from 'sharp';

@Injectable()
export class ResizeImagePipe implements PipeTransform<Express.Multer.File, Promise<string>>  {
  async transform(image: Express.Multer.File, metadata: ArgumentMetadata): Promise<string>  {
    const originalName = path.parse(image.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';
    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join('uploads', filename));

      return filename;
  }
}
