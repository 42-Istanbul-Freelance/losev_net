import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity, ActivityStatus } from './activity.entity';
import { ActivityParticipant, ParticipantStatus } from './participant.entity';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
    @InjectRepository(ActivityParticipant)
    private participantRepository: Repository<ActivityParticipant>,
  ) {}

  async create(activityData: Partial<Activity>, user: User): Promise<Activity> {
    if (user.role === UserRole.STUDENT) {
      throw new ForbiddenException('Öğrenciler etkinlik oluşturamaz.');
    }
    const activity = this.activitiesRepository.create({
      ...activityData,
      creatorId: user.id,
      status: ActivityStatus.APPROVED, // Admin/Öğretmen oluşturduğu için direkt onaylı
    });
    return this.activitiesRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activitiesRepository.find({
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException('Etkinlik bulunamadı.');
    }
    return activity;
  }

  async joinActivity(activityId: number, code: string, student: User): Promise<ActivityParticipant> {
    const activity = await this.findOne(activityId);

    if (activity.code !== code) {
      throw new ForbiddenException('Geçersiz katılım kodu.');
    }

    const existing = await this.participantRepository.findOne({
      where: { activityId, studentId: student.id }
    });
    if (existing) {
      return existing;
    }

    const participant = this.participantRepository.create({
      activityId,
      studentId: student.id,
      status: ParticipantStatus.PENDING,
    });
    return this.participantRepository.save(participant);
  }

  async getMyParticipations(studentId: number) {
    return this.participantRepository.find({
      where: { studentId },
      relations: ['activity'],
      order: { createdAt: 'DESC' }
    });
  }

  async getPendingParticipants(user: User) {
    const query = this.participantRepository.createQueryBuilder('participant')
      .leftJoinAndSelect('participant.activity', 'activity')
      .leftJoinAndSelect('participant.student', 'student')
      .where('participant.status = :status', { status: ParticipantStatus.PENDING });

    if (user.role === UserRole.TEACHER) {
      query.andWhere('student.teacherId = :teacherId', { teacherId: user.id });
    }

    return query.getMany();
  }

  async updateParticipantStatus(participantId: number, status: ParticipantStatus, user: User) {
    const participant = await this.participantRepository.findOne({
      where: { id: participantId },
      relations: ['student']
    });
    if (!participant) {
      throw new NotFoundException('Katılım kaydı bulunamadı.');
    }

    if (user.role === UserRole.TEACHER) {
      if (participant.student.role !== UserRole.STUDENT) {
        throw new ForbiddenException('Öğretmenler sadece öğrencileri onaylayabilir.');
      }
      if (participant.student.teacherId !== user.id) {
        throw new ForbiddenException('Sadece kendi öğrencilerinizi onaylayabilirsiniz.');
      }
    }

    participant.status = status;
    return this.participantRepository.save(participant);
  }

  async getStatsByStudent(studentId: number) {
    const participations = await this.participantRepository.find({
      where: { studentId, status: ParticipantStatus.APPROVED },
      relations: ['activity'],
    });

    const totalHours = participations.reduce((sum, p) => sum + p.activity.hours, 0);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyHours = participations
      .filter((p) => {
        const d = new Date(p.activity.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, p) => sum + p.activity.hours, 0);

    return {
      totalHours,
      monthlyHours,
      activityCount: participations.length,
    };
  }

  async getGlobalStats() {
    const totalHours = await this.participantRepository
      .createQueryBuilder('participant')
      .innerJoin('participant.activity', 'activity')
      .where('participant.status = :status', { status: ParticipantStatus.APPROVED })
      .select('SUM(activity.hours)', 'total')
      .getRawOne();

    const statsByCity = await this.participantRepository
      .createQueryBuilder('participant')
      .innerJoin('participant.activity', 'activity')
      .innerJoin('participant.student', 'student')
      .where('participant.status = :status', { status: ParticipantStatus.APPROVED })
      .select('student.city', 'city')
      .addSelect('SUM(activity.hours)', 'hours')
      .groupBy('student.city')
      .getRawMany();

    return {
      totalApprovedHours: parseFloat(totalHours?.total || '0'),
      cityDistribution: statsByCity.map((s) => ({
        city: s.city,
        totalHours: parseFloat(s.hours || '0'),
      })),
    };
  }

  async getRankings() {
    const topStudents = await this.participantRepository
      .createQueryBuilder('participant')
      .innerJoin('participant.activity', 'activity')
      .innerJoin('participant.student', 'student')
      .where('participant.status = :status', { status: ParticipantStatus.APPROVED })
      .select('student.fullName', 'name')
      .addSelect('student.schoolName', 'school')
      .addSelect('SUM(activity.hours)', 'totalHours')
      .groupBy('student.id')
      .orderBy('totalHours', 'DESC')
      .limit(10)
      .getRawMany();

    const topSchools = await this.participantRepository
      .createQueryBuilder('participant')
      .innerJoin('participant.activity', 'activity')
      .innerJoin('participant.student', 'student')
      .where('participant.status = :status', { status: ParticipantStatus.APPROVED })
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
