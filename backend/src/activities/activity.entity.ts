import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum ActivityType {
  SEMINAR = 'SEMINAR',
  STAND = 'STAND',
  DONATION = 'DONATION',
  BAZAAR = 'BAZAAR', // KERMES
  PUBLIC_AWARENESS = 'PUBLIC_AWARENESS',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  AWARENESS_EVENT = 'AWARENESS_EVENT',
}

export enum ActivityStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVISION_REQUESTED = 'REVISION_REQUESTED',
}

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ type: 'simple-enum', enum: ActivityType })
  type: ActivityType;

  @Column({ type: 'float' })
  hours: number;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  documentUrl: string;

  @Column({ type: 'simple-enum', enum: ActivityStatus, default: ActivityStatus.PENDING })
  status: ActivityStatus;

  @Column({ nullable: true })
  rejectionReason: string;

  @ManyToOne(() => User, (user) => user.activities)
  student: User;

  @Column()
  studentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
