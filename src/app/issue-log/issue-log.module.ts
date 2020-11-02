import { Module } from '@nestjs/common';
import { IssueLogController } from './issue-log.controller';
import { IssueLogService } from './issue-log.service';

@Module({
  controllers: [IssueLogController],
  providers: [IssueLogService]
})
export class IssueLogModule {}
