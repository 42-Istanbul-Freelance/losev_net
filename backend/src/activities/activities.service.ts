import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity, ActivityStatus } from './activity.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(activityData: Partial<Activity>, user: User): Promise<Activity> {
    const activity = this.activitiesRepository.create({
      ...activityData,
      studentId: user.id,
    });
    return this.activitiesRepository.save(activity);
  }

  async findByStudent(studentId: number): Promise<Activity[]> {
    return this.activitiesRepository.find({
      where: { studentId },
      order: { date: 'DESC' },
    });
  }

  async findAllPending(): Promise<Activity[]> {
    return this.activitiesRepository.find({
      where: { status: ActivityStatus.PENDING },
      relations: ['student'],
      order: { createdAt: 'ASC' },
    });
  }

  async updateStatus(id: number, status: ActivityStatus, rejectionReason?: string): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException('Faaliyet bulunamadı.');
    }
    activity.status = status;
    if (rejectionReason) {
      activity.rejectionReason = rejectionReason;
    }
    return this.activitiesRepository.save(activity);
  }

  async getStatsByStudent(studentId: number) {
    const activities = await this.activitiesRepository.find({
      where: { studentId, status: ActivityStatus.APPROVED },
    });
    const totalHours = activities.reduce((sum, activity) => sum + activity.hours, 0);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyHours = activities
      .filter((a) => {
        const d = new Date(a.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, activity) => sum + activity.hours, 0);

    return {
      totalHours,
      monthlyHours,
      activityCount: activities.length,
    };
  }

  async getGlobalStats() {
    const totalHours = await this.activitiesRepository
      .createQueryBuilder('activity')
      .where('activity.status = :status', { status: ActivityStatus.APPROVED })
      .select('SUM(activity.hours)', 'total')
      .getRawOne();

    const statsByCity = await this.activitiesRepository
      .createQueryBuilder('activity')
      .innerJoin('activity.student', 'student')
      .where('activity.status = :status', { status: ActivityStatus.APPROVED })
      .select('student.city', 'city')
      .addSelect('SUM(activity.hours)', 'hours')
      .groupBy('student.city')
      .getRawMany();

    return {
      totalHours: parseFloat(totalHours?.total || '0'),
      statsByCity,
    };
  }

  async getRankings() {
    const topStudents = await this.activitiesRepository
      .createQueryBuilder('activity')
      .innerJoin('activity.student', 'student')
      .where('activity.status = :status', { status: ActivityStatus.APPROVED })
      .select('student.fullName', 'name')
      .addSelect('student.schoolName', 'school')
      .addSelect('SUM(activity.hours)', 'totalHours')
      .groupBy('student.id')
      .orderBy('totalHours', 'DESC')
      .limit(10)
      .getRawMany();

    const topSchools = await this.activitiesRepository
      .createQueryBuilder('activity')
      .innerJoin('activity.student', 'student')
      .where('activity.status = :status', { status: ActivityStatus.APPROVED })
      .select('student.schoolName', 'school')
      .addSelect('SUM(activity.hours)', 'totalHours')
      .groupBy('student.schoolName')
      .orderBy('totalHours', 'DESC')
      .limit(10)
      .getRawMany();

    return {
      topStudents,
      topSchools,
    };
  }
}
