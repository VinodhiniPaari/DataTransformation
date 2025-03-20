import { IsString } from 'class-validator';

export class UploadStatusDto {
  @IsString()
  message: string;

  @IsString()
  filename: string;

  @IsString()
  path: string;
}
