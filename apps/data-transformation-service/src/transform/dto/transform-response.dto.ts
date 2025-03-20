import { IsString, IsObject, IsArray } from 'class-validator';

export class TransformResponseDto {
  @IsString()
  status: string;

  @IsArray()
  data: any[];

  @IsString()
  message?: string;
}
