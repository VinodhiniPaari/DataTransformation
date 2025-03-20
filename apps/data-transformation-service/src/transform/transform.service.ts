import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { applyMapping, normalizeHeaders } from '../utils/mapping.utils';
import { cleanData } from '../utils/transformation.utils';
import { TransformResponseDto } from './dto/transform-response.dto';

interface TransformedData {
  [key: string]: any;
}

@Injectable()
export class TransformService {
  async transformData(
    filePath: string,
    mapping: any,
  ): Promise<TransformResponseDto> {
    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('File not found');
    }

    return new Promise((resolve, reject) => {
      const results: TransformedData[] = [];

      let normalizedHeaders: string[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('headers', (headers) => {
          normalizedHeaders = normalizeHeaders(headers);
        })
        .on('data', (data) => {
          const cleanedData = cleanData(data);
          const transformedData = applyMapping(cleanedData, mapping);
          results.push(transformedData);
        })
        .on('end', () => {
          resolve({ status: 'Completed', data: results });
        })
        .on('error', (error) => {
          reject({ status: 'Error', message: error.message });
        });
    });
  }
}
