import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopmentLogModule } from './app/development-log/development-log.module';
import { IssueLogModule } from './app/issue-log/issue-log.module';
import { ProjectsModule } from './app/projects/projects.module';

@Module({
  imports: [
    Logger,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    DevelopmentLogModule,
    IssueLogModule,
    ProjectsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
