import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateIssueLogDto } from './dto/CreateIssueLog.dto';
import { EditIssueLogDto } from './dto/EditIssueLog.dto';
import { IssueLogService } from './issue-log.service';

@Controller('issue-logs')
export class IssueLogController {
  constructor(
    private readonly issueLogService: IssueLogService,
  ){}

  @Get()
  async index() {
    const issueLogs = await this.issueLogService.index();
    return issueLogs;
  }

  @Get(':issueLogId')
  async findById(@Param('issueLogId') issueLogId: number) {
    const issueLog = await this.issueLogService.findById(issueLogId);
    return issueLog;
  }

  @Post()
  async create(@Body() body: CreateIssueLogDto) {
    const newissueLog = await this.issueLogService.create(body);
    return newissueLog;
  }

  @Patch(':issueLogId')
  async edit(
    @Body() body: EditIssueLogDto,
    @Param('issueLogId') issueLogId: number
  ) {
    const issueLog = await this.issueLogService.edit(issueLogId, body);
    return issueLog;
  }

  @Delete(':issueLogId')
  @HttpCode(204)
  async trash(@Param('issueLogId') issueLogId: number) {
    const trashedDevelopmentLog = await this.issueLogService.trash(issueLogId);
    if (trashedDevelopmentLog) {
      return true;
    }
  }

  @Post(':issueLogId/restore')
  @HttpCode(204)
  async restore(@Param('issueLogId') issueLogId: number) {
    const restoredDevelopmentLog = await this.issueLogService.restore(issueLogId);
    if (restoredDevelopmentLog) {
      return true;
    }
  }
}
