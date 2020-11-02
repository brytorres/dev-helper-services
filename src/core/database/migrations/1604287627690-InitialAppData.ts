import { IssueLog } from "src/app/issue-log/issue-log.entity";
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

    const issue1 = new IssueLog();
    issue1.dateTime = new Date('2020-10-30 22:32:37.000000').toISOString();
    issue1.errorMessage = 'TypeError: type string is not the one it needs to be';
    issue1.errorDescription = 'A type error happens when saving a document.';
    issue1.errorStack = { foo: 'bar' };
    issue1.keywords = ['get', 'test'];
    issue1.solution = 'Lorem ipsum..dfads adsf al df';
    await manager.insert(IssueLog, issue1);

    const issue2 = new IssueLog();
    issue2.dateTime = new Date('2020-10-31 22:32:37.000000').toISOString();
    issue2.errorMessage = 'Invalid character';
    issue2.errorDescription = 'An invalid character error shows up when running a SQL query.';
    issue2.errorStack = { bar: 'baz' };
    issue2.keywords = ['post', 'test'];
    issue2.solution = 'Lorem ipsum..dfads adsf al df';
    await manager.insert(IssueLog, issue2);

    const issue3 = new IssueLog();
    issue3.dateTime = new Date('2020-11-01 22:32:37.000000').toISOString();
    issue3.errorMessage = 'Test';
    issue3.errorDescription = 'Short test one.';
    issue3.errorStack = { foo: 'bar' };
    issue3.keywords = ['food'];
    issue3.solution = 'Lorem ipsum..dfads adsf al df';
    await manager.insert(IssueLog, issue3);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const manager = getManager();
    
    const projects = await manager.find(Project)
    await manager.delete(Project, projects);
  }

}
