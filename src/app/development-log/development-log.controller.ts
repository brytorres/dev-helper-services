import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateDevelopmentLogDto } from './dto/CreateDevelopmentLog.dto';
import { DevelopmentLogService } from './development-log.service';
import { EditDevelopmentLogDto } from './dto/EditDevelopmentLog.dto';

@Controller('development-logs')
export class DevelopmentLogController {
  constructor(
    private readonly developmentLogService: DevelopmentLogService,
  ){}

  @Get()
  async index() {
    const developmentLogs = await this.developmentLogService.index();
    return developmentLogs;
  }

  @Get(':developmentLogId')
  async findById(@Param('developmentLogId') developmentLogId: number) {
    const developmentLog = await this.developmentLogService.findById(developmentLogId);
    return developmentLog;
  }

  @Post()
  async create(@Body() body: CreateDevelopmentLogDto) {
    const newdevelopmentLog = await this.developmentLogService.create(body);
    return newdevelopmentLog;
  }

  @Patch(':developmentLogId')
  async edit(
    @Body() body: EditDevelopmentLogDto,
    @Param('developmentLogId') developmentLogId: number
  ) {
    const developmentLog = await this.developmentLogService.edit(developmentLogId, body);
    return developmentLog;
  }

  @Delete(':developmentLogId')
  @HttpCode(204)
  async trash(@Param('developmentLogId') developmentLogId: number) {
    const trashedDevelopmentLog = await this.developmentLogService.trash(developmentLogId);
    if (trashedDevelopmentLog) {
      return true;
    }
  }

  @Post(':developmentLogId/restore')
  @HttpCode(204)
  async restore(@Param('developmentLogId') developmentLogId: number) {
    const restoredDevelopmentLog = await this.developmentLogService.restore(developmentLogId);
    if (restoredDevelopmentLog) {
      return true;
    }
  }
}
