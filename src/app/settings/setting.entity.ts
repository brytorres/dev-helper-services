import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true, nullable: false })
  key: string;

  @Column('jsonb', { nullable: false })
  value: any;
}