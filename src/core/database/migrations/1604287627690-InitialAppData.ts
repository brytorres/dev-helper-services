import { Project } from "src/app/projects/project.entity";
import {getManager, MigrationInterface, QueryRunner} from "typeorm";

export class InitialAppData1604287627690 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = getManager();

    // Insert initial projects
    const nebiProject = new Project();
    nebiProject.name = 'nebi';
    nebiProject.title = 'Nebi';
    await manager.insert(Project, nebiProject);

    const athlianceProject = new Project();
    athlianceProject.name = 'athliance';
    athlianceProject.title = 'Athliance';
    await manager.insert(Project, athlianceProject);

    const projectTrackerProject = new Project();
    projectTrackerProject.name = 'projectTracker';
    projectTrackerProject.title = 'Project Tracker';
    await manager.insert(Project, projectTrackerProject);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const manager = getManager();
    
    const projects = await manager.find(Project)
    await manager.delete(Project, projects);
  }

}
