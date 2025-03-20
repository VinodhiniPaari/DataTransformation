import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async processFile(file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      path: file.path,
    };
  }
}
