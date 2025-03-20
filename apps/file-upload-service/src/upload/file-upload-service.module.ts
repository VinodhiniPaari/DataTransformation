import { Module } from '@nestjs/common';
import { UploadService } from './file-upload-service.service';
import { UploadController } from './file-upload-service.controller';
import { AuthModule } from '../../../auth-service/src/auth/auth-service.module';

@Module({
  imports: [AuthModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
