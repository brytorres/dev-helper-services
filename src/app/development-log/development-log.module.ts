import { Module } from '@nestjs/common';
import { DevelopmentLogController } from './development-log.controller';
import { DevelopmentLogService } from './development-log.service';

@Module({
  controllers: [DevelopmentLogController],
  providers: [DevelopmentLogService]
})
export class DevelopmentLogModule {}
