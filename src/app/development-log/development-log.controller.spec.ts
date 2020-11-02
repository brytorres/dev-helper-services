import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentLogController } from './development-log.controller';

describe('DevelopmentLogController', () => {
  let controller: DevelopmentLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopmentLogController],
    }).compile();

    controller = module.get<DevelopmentLogController>(DevelopmentLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
