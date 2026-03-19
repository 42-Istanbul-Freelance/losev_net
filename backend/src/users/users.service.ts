import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  async updateStatus(id: number, status: UserStatus, currentUser: User, teacherId?: number): Promise<User> {
    const userToUpdate = await this.findOneById(id);
    if (!userToUpdate) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }

    if (currentUser.role === UserRole.TEACHER) {
      if (userToUpdate.role !== UserRole.STUDENT) {
        throw new ForbiddenException('Öğretmenler sadece öğrencileri onaylayabilir.');
      }
      // Note: If teacher is approving, they become the coordinator for that student
      userToUpdate.teacherId = currentUser.id;
    }

    if (currentUser.role === UserRole.ADMIN) {
        if (teacherId) {
            userToUpdate.teacherId = teacherId;
        }
    }

    userToUpdate.status = status;
    return this.usersRepository.save(userToUpdate);
  }

  async findAllPending(currentUser: User): Promise<User[]> {
    if (currentUser.role === UserRole.ADMIN) {
        return this.usersRepository.find({ where: { status: UserStatus.PENDING } });
    } else if (currentUser.role === UserRole.TEACHER) {
        return this.usersRepository.find({ where: { status: UserStatus.PENDING, role: UserRole.STUDENT } });
    }
    return [];
  }

  async findAllByRole(role: UserRole): Promise<User[]> {
    return this.usersRepository.find({ where: { role } });
  }
}
