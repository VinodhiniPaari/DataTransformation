import { Module } from '@nestjs/common';
import { UploadService } from './file-upload-service.service';
import { UploadController } from './file-upload-service.controller';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
