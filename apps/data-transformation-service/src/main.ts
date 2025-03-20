import { NestFactory } from '@nestjs/core';
import { TransformModule } from './transform/transform.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TransformModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
  console.log(
    'Data Transformation Service is running on http://localhost:3002',
  );
}
bootstrap();
