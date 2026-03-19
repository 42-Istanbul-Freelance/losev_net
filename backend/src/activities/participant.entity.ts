import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Activity } from './activity.entity';

export enum ParticipantStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class ActivityParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity)
  activity: Activity;

  @Column()
  activityId: number;

  @ManyToOne(() => User)
  student: User;

  @Column()
  studentId: number;

  @Column({ type: 'simple-enum', enum: ParticipantStatus, default: ParticipantStatus.PENDING })
  status: ParticipantStatus;

  @CreateDateColumn()
  createdAt: Date;
}
