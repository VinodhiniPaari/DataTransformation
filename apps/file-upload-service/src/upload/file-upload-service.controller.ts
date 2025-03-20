import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './file-upload-service.service';
import { multerOptions } from '../middleware/multer.middleware';
import { JwtAuthGuard } from '../../../auth-service/src/auth/guards/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File upload failed');
    }

    if (file.size > 100 * 1024 * 1024) {
      throw new BadRequestException('File exceeds 100MB limit');
    }

    try {
      return await this.uploadService.processFile(file);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Error processing file: ${error.message}`,
        );
      }
      throw new BadRequestException(
        'An unknown error occurred while processing the file.',
      );
    }
  }
}
