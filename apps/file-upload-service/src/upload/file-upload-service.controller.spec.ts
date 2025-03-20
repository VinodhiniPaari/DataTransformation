import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './file-upload-service.controller';
import { UploadService } from './file-upload-service.service';

describe('FileUploadServiceController', () => {
  let fileUploadServiceController: UploadController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [UploadService],
    }).compile();

    fileUploadServiceController = app.get<UploadController>(UploadController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fileUploadServiceController.getHello()).toBe('Hello World!');
    });
  });
});
