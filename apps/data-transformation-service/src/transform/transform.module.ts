import { Module } from '@nestjs/common';
import { TransformService } from './transform.service';
import { TransformController } from './transform.controller';

@Module({
  controllers: [TransformController],
  providers: [TransformService],
})
export class TransformModule {}
