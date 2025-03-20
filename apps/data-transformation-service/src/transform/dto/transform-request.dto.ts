import { IsString, IsObject } from 'class-validator';

export class TransformRequestDto {
  @IsString()
  filePath: string;

  @IsObject()
  mapping: any;
}
