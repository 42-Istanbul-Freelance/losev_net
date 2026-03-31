import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto, JoinActivityDto, UpdateParticipantStatusDto } from './activity.dto';

@ApiTags('activities')
@ApiBearerAuth()
@Controller('activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Yeni etkinlik oluştur (Admin/Öğretmen)' })
  async create(
    @Request() req,
    @Body() createActivityDto: CreateActivityDto
  ) {
    return this.activitiesService.create(createActivityDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Tüm etkinlikleri listele' })
  async findAll() {
    return this.activitiesService.findAll();
  }

  @Post('join')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Etkinliğe katılım bildir' })
  async joinActivity(
    @Request() req,
    @Body() joinDto: JoinActivityDto
  ) {
    return this.activitiesService.joinActivity(joinDto.activityId, joinDto.code, req.user);
  }

  @Get('my-participations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Kendi katıldığım etkinlikleri listele' })
  async getMyParticipations(@Request() req) {
    return this.activitiesService.getMyParticipations(req.user.id);
  }

  @Get('pending-participants')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Onay bekleyen katılımcılar (Öğretmen/Admin)' })
  async getPendingParticipants(@Request() req) {
    return this.activitiesService.getPendingParticipants(req.user);
  }

  @Patch('participant/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Katılımcı durumunu güncelle (Onay/Red)' })
  async updateParticipantStatus(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateParticipantStatusDto
  ) {
    return this.activitiesService.updateParticipantStatus(id, updateDto.status, req.user);
  }

  @Get('my/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Öğrencinin kendi saat istatistikleri' })
  async getMyStats(@Request() req) {
    return this.activitiesService.getStatsByStudent(req.user.id);
  }

  @Get('stats/global')
  @ApiOperation({ summary: 'Genel istatistikler (Public)' })
  async getGlobalStats() {
    return this.activitiesService.getGlobalStats();
  }

  @Get('stats/rankings')
  @ApiOperation({ summary: 'Sıralamalar (En aktif öğrenciler/okullar)' })
  async getRankings() {
    return this.activitiesService.getRankings();
  }
}
