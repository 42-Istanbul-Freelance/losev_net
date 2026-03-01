import { DataSource } from 'typeorm';
import { User, UserRole, UserStatus } from '../users/user.entity';
import { Activity, ActivityType, ActivityStatus } from '../activities/activity.entity';
import * as bcrypt from 'bcrypt';

export async function seedData(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const activityRepository = dataSource.getRepository(Activity);

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
  console.log('Pending student registration created for Admin approval testing.');

  // 5. Add activities for students
  const activities = [
    {
      date: new Date().toISOString().split('T')[0],
      type: ActivityType.SEMINAR,
      hours: 2.5,
      description: 'LÖSEV Farkındalık Semineri katılımı.',
      status: ActivityStatus.APPROVED,
      studentId: student1.id,
    },
    {
      date: new Date().toISOString().split('T')[0],
      type: ActivityType.STAND,
      hours: 5,
      description: 'AVM standında bilgilendirme çalışması.',
      status: ActivityStatus.APPROVED,
      studentId: student1.id,
    },
    {
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      type: ActivityType.SOCIAL_MEDIA,
      hours: 1,
      description: 'LÖSEV kampanyası paylaşımı.',
      status: ActivityStatus.PENDING,
      studentId: student1.id,
    },
    {
      date: new Date().toISOString().split('T')[0],
      type: ActivityType.BAZAAR,
      hours: 4,
      description: 'Kermes yardım faaliyeti.',
      status: ActivityStatus.PENDING,
      studentId: student2.id,
    },
    {
      date: new Date().toISOString().split('T')[0],
      type: ActivityType.DONATION,
      hours: 2,
      description: 'Bağış kampanyası desteği.',
      status: ActivityStatus.PENDING,
      studentId: student2.id,
    },
  ];

  for (const actData of activities) {
    const activity = activityRepository.create(actData);
    await activityRepository.save(activity);
  }
  console.log('Mock activities created for student');
  console.log('Automatic seeding complete.');
}
