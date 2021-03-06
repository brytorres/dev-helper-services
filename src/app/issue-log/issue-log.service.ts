import { HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ProjectService } from '../projects/project.service';
import { CreateIssueLogDto } from './dto/CreateIssueLog.dto';
import { EditIssueLogDto } from './dto/EditIssueLog.dto';
import { IssueLog } from './issue-log.entity';

@Injectable()
export class IssueLogService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectRepository(IssueLog)
    private issueLogRepo: Repository<IssueLog>,
    private readonly projectService: ProjectService,
  ){}

  /**
   * get all issue log
   */
  async index() {
    try {
      const issueLogs = await this.issueLogRepo.find({
        order: {
          id: 'DESC'
        }
      });
      return issueLogs;
    } catch (error) {
      this.logger.error(error)
    }
  }

  /**
   * Find a issue log by ID.
   * @param issueLogId - Developement log ID
   */
  async findById(issueLogId: number) {
    try {
      const issueLog = await this.issueLogRepo.findOneOrFail(issueLogId);
      return issueLog;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
  

  /**
   * Search for a issue log.
   * @param seachBody - Search object
   */
  async search(searchBody: {
    errorMessage: string;
    errorDescription: string;
    keywords: string[];
  }) {
    try {
      const searchQuery = await getRepository(IssueLog)
        .createQueryBuilder('issue_log')

      if (searchBody.errorMessage) {
        searchQuery.andWhere(`issue_log.errorMessage ILIKE '%' || :message || '%'`, {
          message: searchBody.errorMessage
        })
      }
      if (searchBody.errorDescription) {
        searchQuery.andWhere(`issue_log.errorDescription ILIKE '%' || :description || '%'`, {
          description: searchBody.errorDescription
        })
      }
      if (searchBody.keywords) {
        searchQuery.andWhere(`"issue_log"."keywords"::jsonb ?| :keywords`, {
          keywords: searchBody.keywords
        })
      }

      return searchQuery.getMany();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Create a new issue log.
   * @param body - New log data
   */
  async create(body: CreateIssueLogDto) {
    try {
      const newIssueLog = new IssueLog();
      newIssueLog.dateTime = new Date(body.dateTime).toISOString();
      newIssueLog.errorMessage = body.errorMessage;
      newIssueLog.errorStack = body.errorStack;
      newIssueLog.errorDescription = body.errorDescription;
      newIssueLog.solution = body.solution;
      newIssueLog.keywords = [];
      newIssueLog.projects = [];

      if (body.hasOwnProperty('keywords') && body.projects.length > 0) {
        for (const keyword of body.keywords) {
          newIssueLog.keywords.push(keyword)
        }
      }

      if (body.hasOwnProperty('projects') && body.projects.length > 0) {
        for (const projectId of body.projects) {
          const project = await this.projectService.findById(projectId)
          newIssueLog.projects.push(project)
        }
      }

      await this.issueLogRepo.save(newIssueLog);
      return newIssueLog;
    } catch (error) {
      console.log(error)
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit a issue log.
   * @param issueLogId - Issue log ID
   * @param body - Edited log data
   */
  async edit(issueLogId: number, body: EditIssueLogDto) {
    const issueLog = await this.findById(issueLogId);
    try {
      if (body.dateTime) { issueLog.dateTime = body.dateTime; }
      if (body.errorMessage) { issueLog.errorMessage = body.errorMessage; }
      if (body.errorStack) { issueLog.errorStack = body.errorStack; }
      if (body.errorDescription) { issueLog.errorDescription = body.errorDescription; }
      if (body.solution) { issueLog.solution = body.solution; }

      if (body.hasOwnProperty('keywords') && body.projects.length > 0) {
        for (const keyword of body.keywords) {
          issueLog.keywords.push(keyword)
        }
      }

      if (body.hasOwnProperty('projects') && body.projects.length > 0) {
        for (const projectId of body.projects) {
          const project = await this.projectService.findById(projectId)
          issueLog.projects.push(project)
        }
      }

      await this.issueLogRepo.save(issueLog);
      return issueLog;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Trash a issue log.
   * @param issueLogId - Issue log ID
   */
  async trash(issueLogId: number) {
    const issueLog = await this.findById(issueLogId);
    try {
      issueLog.trashedAt = new Date().toISOString();
      await this.issueLogRepo.save(issueLog);
      return true;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Restore a trashed issue log.
   * @param issueLogId - Issue log ID
   */
  async restore(issueLogId: number) {
    const issueLog = await this.findById(issueLogId);
    try {
      issueLog.trashedAt = null;
      await this.issueLogRepo.save(issueLog);
      return true;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

