import { CreateProjectDto } from './dto/CreateProject.dto';
import { EditProjectDto } from './dto/EditProject.dto';
import { HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>
  ){}

  /**
   * get all projects
   */
  async index() {
    try {
      const projects = await this.projectRepo.find({
        order: {
          id: 'ASC'
        }
      });
      return projects;
    } catch (error) {
      this.logger.error(error)
    }
  }

  /**
   * Find a project by ID.
   * @param projectId - Project ID
   */
  async findById(projectId: number) {
    try {
      const project = await this.projectRepo.findOneOrFail(projectId);
      return project;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Create a new project.
   * @param body - New project data
   */
  async create(body: CreateProjectDto) {
    try {
      const newProject = new Project();
      newProject.name = body.name;
      newProject.title = body.title;
      newProject.dateStarted = body.dateStarted;
      newProject.dateCompleted = body.dateCompleted;

      await this.projectRepo.save(newProject);
      return newProject;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit a project.
   * @param projectId - Project ID
   * @param body - Edited project data
   */
  async edit(projectId: number, body: EditProjectDto) {
    const project = await this.findById(projectId);
    try {
      if (body.name) { project.name = body.name; }
      if (body.title) { project.title = body.title; }
      if (body.dateStarted) { project.dateStarted = body.dateStarted; }
      if (body.dateCompleted) { project.dateCompleted = body.dateCompleted; }

      await this.projectRepo.save(project);
      return project;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Trash a project.
   * @param projectId - Project ID
   */
  async trash(projectId: number) {
    const project = await this.findById(projectId);
    try {
      project.trashedAt = new Date().toISOString();
      await this.projectRepo.save(project);
      return true;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Restore a trashed project.
   * @param projectId - Project ID
   */
  async restore(projectId: number) {
    const project = await this.findById(projectId);
    try {
      project.trashedAt = null;
      await this.projectRepo.save(project);
      return true;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
