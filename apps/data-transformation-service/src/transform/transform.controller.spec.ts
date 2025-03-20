import { Test, TestingModule } from '@nestjs/testing';
import { TransformController } from './transform.controller';
import { TransformService } from './transform.service';

describe('TransformController', () => {
  let transformController: TransformController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransformController],
      providers: [TransformService],
    }).compile();

    transformController = app.get<TransformController>(TransformController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(transformController.getHello()).toBe('Hello World!');
    });
  });
});
