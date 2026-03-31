import { DataSource } from 'typeorm';
import { User, UserRole, UserStatus } from '../users/user.entity';
import { Activity, ActivityType, ActivityStatus } from '../activities/activity.entity';
import { ActivityParticipant, ParticipantStatus } from '../activities/participant.entity';
import { Announcement } from '../announcements/announcement.entity';
import * as bcrypt from 'bcrypt';

export async function seedData(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const activityRepository = dataSource.getRepository(Activity);
  const participantRepository = dataSource.getRepository(ActivityParticipant);
  const announcementRepository = dataSource.getRepository(Announcement);

  // Check if we already have users
  const userCount = await userRepository.count();
  if (userCount > 0) {
    console.log('Database already has data. Skipping automatic seed.');
    return;
  }

  console.log('Starting automatic database seeding...');

  const adminPassword = await bcrypt.hash('adminpassword', 10);
  const demoPassword = await bcrypt.hash('123456', 10);

  // 1. Create Admin
  const admin = userRepository.create({
    email: 'admin@losev.org.tr',
    password: adminPassword,
    fullName: 'LÖSEV Genel Merkez',
    role: UserRole.ADMIN,
    status: UserStatus.APPROVED,
  });
  await userRepository.save(admin);
  console.log('Admin account created: admin@losev.org.tr / adminpassword');

  // 2. Create Teacher
  const teacher = userRepository.create({
    email: 'teacher@losev.org.tr',
    password: demoPassword,
    fullName: 'Zeynep Öğretmen',
    role: UserRole.TEACHER,
    status: UserStatus.APPROVED,
  });
  await userRepository.save(teacher);
  console.log('Teacher account created: teacher@losev.org.tr / 123456');

  // 3. Create Students and assign to Teacher
  const student1 = userRepository.create({
    email: 'student@losev.org.tr',
    password: demoPassword,
    fullName: 'Ali Gönüllü',
    role: UserRole.STUDENT,
    status: UserStatus.APPROVED,
    tcNo: '12345678901',
    schoolName: 'LÖSEV Anadolu Lisesi',
    city: 'Ankara',
    district: 'Çankaya',
    grade: '10',
    gsm: '5551234567',
    coordinatorName: teacher.fullName,
    teacherId: teacher.id,
  });
  await userRepository.save(student1);

  const student2 = userRepository.create({
    email: 'ayse@losev.org.tr',
    password: demoPassword,
    fullName: 'Ayşe Yılmaz',
    role: UserRole.STUDENT,
    status: UserStatus.APPROVED,
    tcNo: '12345678902',
    schoolName: 'LÖSEV Anadolu Lisesi',
    city: 'İstanbul',
    district: 'Beşiktaş',
    grade: '11',
    gsm: '5557654321',
    coordinatorName: teacher.fullName,
    teacherId: teacher.id,
  });
  await userRepository.save(student2);

  console.log('Students created and assigned to teacher: student@losev.org.tr, ayse@losev.org.tr');

  // 4. Create Pending User for Admin Approval
  const pendingUser = userRepository.create({
    email: 'new.volunteer@gmail.com',
    password: demoPassword,
    fullName: 'Caner Demir',
    role: UserRole.STUDENT,
    status: UserStatus.PENDING,
    schoolName: 'Atatürk Fen Lisesi',
    city: 'İzmir',
    grade: '9',
  });
  await userRepository.save(pendingUser);

  // 5. Create Activities
  const activity1 = activityRepository.create({
    date: '2024-03-01',
    type: ActivityType.SEMINAR,
    hours: 2.5,
    description: 'Geçmiş LÖSEV Farkındalık Semineri',
    status: ActivityStatus.APPROVED,
    creatorId: admin.id,
    code: 'LOSEV01',
  });
  await activityRepository.save(activity1);

  const activity2 = activityRepository.create({
    date: '2024-03-15',
    type: ActivityType.STAND,
    hours: 5,
    description: 'Geçmiş AVM Bilgilendirme Standı',
    status: ActivityStatus.APPROVED,
    creatorId: teacher.id,
    code: 'LOSEV02',
  });
  await activityRepository.save(activity2);

  const upcomingActivity = activityRepository.create({
    date: '2025-05-20',
    type: ActivityType.AWARENESS_EVENT,
    hours: 3.0,
    description: 'Gelecek LÖSEV Koşusu',
    status: ActivityStatus.APPROVED,
    creatorId: admin.id,
    code: 'LOSEV2025',
  });
  await activityRepository.save(upcomingActivity);

  // 6. Create Participations
  await participantRepository.save(participantRepository.create({
    activityId: activity1.id,
    studentId: student1.id,
    status: ParticipantStatus.APPROVED,
  }));

  await participantRepository.save(participantRepository.create({
    activityId: activity2.id,
    studentId: student1.id,
    status: ParticipantStatus.PENDING,
  }));

  await participantRepository.save(participantRepository.create({
    activityId: activity1.id,
    studentId: student2.id,
    status: ParticipantStatus.PENDING,
  }));

  // 7. Create Announcements
  await announcementRepository.save(announcementRepository.create({
    title: 'Yeni Gönüllülük Dönemi Başladı!',
    content: 'Tüm İnci öğrencilerimiz için 30 saatlik gönüllülük hedefi aktiftir.',
    creatorId: admin.id,
  }));

  console.log('Mock data and announcements created.');
  console.log('Automatic seeding complete.');
}
