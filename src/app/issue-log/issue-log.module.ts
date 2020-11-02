import { IssueLog } from './issue-log.entity';
import { IssueLogController } from './issue-log.controller';
import { IssueLogService } from './issue-log.service';
import { Logger, Module } from '@nestjs/common';
import { ProjectModule } from '../projects/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([IssueLog]),
    ProjectModule
  ],
  controllers: [IssueLogController],
  providers: [Logger, IssueLogService]
})
export class IssueLogModule {}
