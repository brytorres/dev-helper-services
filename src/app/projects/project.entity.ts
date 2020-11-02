import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { DevelopmentLog } from '../development-log/development-log.entity';
import { IssueLog } from '../issue-log/issue-log.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: true })
  name: string;

  @Column('varchar', { length: 100, nullable: true })
  title: string;

  @Column('timestamp', { nullable: true })
  dateStarted: string;

  @Column('timestamp', { nullable: true })
  dateCompleted: string;

  @Column('timestamp', { nullable: true })
  trashedAt: string;

  @ManyToMany((type) => DevelopmentLog, (developmentLog) => developmentLog.projects)
  @JoinTable()
  developmentLogs: DevelopmentLog[];

  @ManyToMany((type) => IssueLog, (issueLog) => issueLog.projects)
  @JoinTable()
  issueLogs: IssueLog[];
}