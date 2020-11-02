import { DevelopmentLog } from './development-log.entity';
import { DevelopmentLogController } from './development-log.controller';
import { DevelopmentLogService } from './development-log.service';
import { Logger, Module } from '@nestjs/common';
import { ProjectModule } from '../projects/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([DevelopmentLog]),
    ProjectModule
  ],
  controllers: [DevelopmentLogController],
  providers: [Logger, DevelopmentLogService]
})
export class DevelopmentLogModule {}
