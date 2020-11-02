import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { EditProjectDto } from './dto/EditProject.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
  ){}

  @Get()
  async index() {
    const projects = await this.projectService.index();
    return projects;
  }

  @Get(':projectId')
  async findById(@Param('projectId') projectId: number) {
    const project = await this.projectService.findById(projectId);
    return project;
  }

  @Post()
  async create(@Body() body: CreateProjectDto) {
    const newProject = await this.projectService.create(body);
    return newProject;
  }

  @Patch(':projectId')
  async edit(
    @Body() body: EditProjectDto,
    @Param('projectId') projectId: number
  ) {
    const project = await this.projectService.edit(projectId, body);
    return project;
  }

  @Delete(':projectId')
  @HttpCode(204)
  async trash(@Param('projectId') projectId: number) {
    const trashedProject = await this.projectService.trash(projectId);
    if (trashedProject) {
      return true;
    }
  }

  @Post(':projectId/restore')
  @HttpCode(204)
  async restore(@Param('projectId') projectId: number) {
    const restoredProject = await this.projectService.restore(projectId);
    if (restoredProject) {
      return true;
    }
  }
}
