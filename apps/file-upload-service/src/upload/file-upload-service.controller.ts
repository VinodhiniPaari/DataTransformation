import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './file-upload-service.service';
import { multerOptions } from '../middleware/multer.middleware';

@Controller('upload')
export class UploadController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File upload failed');
    }
    return this.uploadService.processFile(file);
  }
}
