import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      status: userData.role === UserRole.ADMIN ? UserStatus.APPROVED : UserStatus.PENDING,
    });
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateStatus(id: number, status: UserStatus, teacherId?: number): Promise<User> {
    const updateData: any = { status };
    if (teacherId) {
      updateData.teacherId = teacherId;
    }
    await this.usersRepository.update(id, updateData);
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    return user;
  }

  async findAllPending(): Promise<User[]> {
    return this.usersRepository.find({ where: { status: UserStatus.PENDING } });
  }

  async findAllByRole(role: UserRole): Promise<User[]> {
    return this.usersRepository.find({ where: { role } });
  }
}
