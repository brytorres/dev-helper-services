import { Test, TestingModule } from '@nestjs/testing';
import { IssueLogController } from './issue-log.controller';

describe('IssueLogController', () => {
  let controller: IssueLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueLogController],
    }).compile();

    controller = module.get<IssueLogController>(IssueLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
