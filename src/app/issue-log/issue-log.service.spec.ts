import { Test, TestingModule } from '@nestjs/testing';
import { IssueLogService } from './issue-log.service';

describe('IssueLogService', () => {
  let service: IssueLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueLogService],
    }).compile();

    service = module.get<IssueLogService>(IssueLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
