import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { TransformService } from './transform.service';
import { TransformRequestDto } from './dto/transform-request.dto';
import { TransformResponseDto } from './dto/transform-response.dto';

@Controller('transform')
export class TransformController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly transformService: TransformService) {}

  @Post()
  async transformData(
    @Body() body: TransformRequestDto,
  ): Promise<TransformResponseDto> {
    if (!body.filePath || !body.mapping) {
      throw new BadRequestException('File path and mapping are required');
    }
    return this.transformService.transformData(body.filePath, body.mapping);
  }
}
