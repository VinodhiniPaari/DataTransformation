import { NestFactory } from '@nestjs/core';
import { UploadModule } from './upload/file-upload-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UploadModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
  console.log('File Upload Service is running on http://localhost:3001');
}
bootstrap();