import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ): void => {
      const fileExt = extname(file.originalname);
      const filename = `${Date.now()}${fileExt}`;
      callback(null, filename);
    },
  }),

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void => {
    if (file.mimetype !== 'text/csv') {
      const error = new Error('Only CSV files are allowed');
      return callback(error, false);
    }
    callback(null, true);
  },

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB Limit
  },
};
