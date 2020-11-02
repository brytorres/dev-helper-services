import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentLogService } from './development-log.service';

describe('DevelopmentLogService', () => {
  let service: DevelopmentLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevelopmentLogService],
    }).compile();

    service = module.get<DevelopmentLogService>(DevelopmentLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
