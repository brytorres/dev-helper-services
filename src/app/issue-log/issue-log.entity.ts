import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity('issue_logs')
export class IssueLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { nullable: false })
  dateTime: string;

  @Column('text', { nullable: false })
  errorMessage: string;

  @Column('jsonb', { nullable: true })
  errorStack: string;

  @Column('text', { nullable: true })
  errorDescription: string;

  @Column('varchar', { length:100, nullable: true })
  keywords: string;

  @Column('text', { nullable: true })
  solution: string;

  @ManyToMany((type) => Project, (projects) => projects.issueLogs)
  projects: Project[];
}