import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { DevelopmentLogType } from './development-log.constants';

@Entity('development_logs')
export class DevelopmentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { nullable: false })
  dateTime: string;

  @Column({
    type: 'enum',
    enum: DevelopmentLogType,
  })
  type: DevelopmentLogType;

  @Column('text', { nullable: true })
  accomplishments: string;

  @Column('text', { nullable: true })
  notes: string;

  @Column('text', { nullable: true })
  thingsLearned: string;

  @Column('text', { nullable: true })
  toResearch: string;

  @Column('timestamp', { nullable: true })
  trashedAt: string;

  @ManyToMany((type) => Project, (projects) => projects.developmentLogs)
  projects: Project[];
}