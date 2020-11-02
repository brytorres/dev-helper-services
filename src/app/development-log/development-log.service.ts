import { HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectService } from '../projects/project.service';
import { DevelopmentLog } from './development-log.entity';
import { CreateDevelopmentLogDto } from './dto/CreateDevelopmentLog.dto';
import { EditDevelopmentLogDto } from './dto/EditDevelopmentLog.dto';

@Injectable()
export class DevelopmentLogService {

  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectRepository(DevelopmentLog)
    private developmentLogRepo: Repository<DevelopmentLog>,
    private readonly projectService: ProjectService,
  ){}

  /**
   * get all development log
   */
  async index() {
    try {
      const developmentLogs = await this.developmentLogRepo.find();
      return developmentLogs;
    } catch (error) {
      this.logger.error(error)
    }
  }

  /**
   * Find a development log by ID.
   * @param developmentLogId - Developement log ID
   */
  async findById(developmentLogId: number) {
    try {
      const developmentLog = await this.developmentLogRepo.findOneOrFail(developmentLogId);
      return developmentLog;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Create a new development log.
   * @param body - New log data
   */
  async create(body: CreateDevelopmentLogDto) {
    try {
      const newDevelopmentLog = new DevelopmentLog();
      newDevelopmentLog.dateTime = new Date(body.dateTime).toISOString();
      newDevelopmentLog.type = body.type;
      newDevelopmentLog.accomplishments = body.accomplishments;
      newDevelopmentLog.notes = body.notes;
      newDevelopmentLog.thingsLearned = body.thingsLearned;
      newDevelopmentLog.toResearch = body.toResearch;
      newDevelopmentLog.projects = [];

      if (body.hasOwnProperty('projects') && body.projects.length > 0) {
        for (const projectId of body.projects) {
          const project = await this.projectService.findById(projectId)
          newDevelopmentLog.projects.push(project)
        }
      }

      await this.developmentLogRepo.save(newDevelopmentLog);
      return newDevelopmentLog;
    } catch (error) {
      console.log(error)
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit a development log.
   * @param developmentLogId - Development log ID
   * @param body - Edited log data
   */
  async edit(developmentLogId: number, body: EditDevelopmentLogDto) {
    const developmentLog = await this.findById(developmentLogId);
    try {
      if (body.dateTime) { developmentLog.dateTime = body.dateTime; }
      if (body.type) { developmentLog.type = body.type; }
      if (body.accomplishments) { developmentLog.accomplishments = body.accomplishments; }
      if (body.notes) { developmentLog.notes = body.notes; }
      if (body.thingsLearned) { developmentLog.thingsLearned = body.thingsLearned; }
      if (body.toResearch) { developmentLog.toResearch = body.toResearch; }
      if (body.hasOwnProperty('projects') && body.projects.length > 0) {
        for (const projectId of body.projects) {
          const project = await this.projectService.findById(projectId)
          developmentLog.projects.push(project)
        }
      }

      await this.developmentLogRepo.save(developmentLog);
      return developmentLog;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Trash a development log.
   * @param developmentLogId - Development log ID
   */
  async trash(developmentLogId: number) {
    const developmentLog = await this.findById(developmentLogId);
    try {
      developmentLog.trashedAt = new Date().toISOString();
      await this.developmentLogRepo.save(developmentLog);
      return true;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Restore a trashed development log.
   * @param developmentLogId - Development log ID
   */
  async restore(developmentLogId: number) {
    const developmentLog = await this.findById(developmentLogId);
    try {
      developmentLog.trashedAt = null;
      await this.developmentLogRepo.save(developmentLog);
      return true;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
