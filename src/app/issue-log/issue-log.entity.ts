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
  errorStack: any;

  @Column('text', { nullable: true })
  errorDescription: string;

  @Column('jsonb', { nullable: true })
  keywords: string[];

  @Column('text', { nullable: true })
  solution: string;

  @Column('timestamp', { nullable: true })
  trashedAt: string;

  @ManyToMany((type) => Project, (projects) => projects.issueLogs)
  projects: Project[];
}