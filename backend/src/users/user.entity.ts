import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Activity } from '../activities/activity.entity';

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'simple-enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Column({ type: 'simple-enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  // Student specific fields
  @Column({ nullable: true })
  tcNo: string;

  @Column({ nullable: true })
  schoolName: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  gsm: string;

  @Column({ nullable: true })
  coordinatorName: string;

  @ManyToOne(() => User, (user) => user.students, { nullable: true })
  teacher: User;

  @Column({ nullable: true })
  teacherId: number;

  @OneToMany(() => User, (user) => user.teacher)
  students: User[];

  @OneToMany(() => Activity, (activity) => activity.student)
  activities: Activity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
