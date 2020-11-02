import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './user.constants';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  fullName: string;

  @Column('varchar', { length: 100, nullable: false })
  email: string;

  @Column('varchar', { length: 100, nullable: true })
  password: string;

  @Column('varchar', { length: 100, nullable: true })
  websiteUrl: string;

  @Column('varchar', { length: 32, nullable: false })
  phoneNumber: string;
  
  @Column({
    type: 'enum',
    enum: UserStatus,
  })
  status: UserStatus;
}
