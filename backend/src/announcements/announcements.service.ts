import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './announcement.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private announcementsRepository: Repository<Announcement>,
  ) {}

  async create(data: Partial<Announcement>, user: User): Promise<Announcement> {
    const announcement = this.announcementsRepository.create({
      ...data,
      creatorId: user.id,
    });
    return this.announcementsRepository.save(announcement);
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementsRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['creator'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.announcementsRepository.delete(id);
  }
}
