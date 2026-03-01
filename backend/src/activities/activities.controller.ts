import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request, UseInterceptors, UploadedFiles, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto, UpdateActivityStatusDto } from './activity.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@ApiTags('activities')
@ApiBearerAuth()
@Controller('activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Yeni faaliyet girişi' })
  @UseInterceptors(FilesInterceptor('files', 2, {
    storage: diskStorage({
      // Use absolute path from cwd (/app in Docker)
      destination: join(process.cwd(), 'uploads'),
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  async create(
    @Request() req,
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const activityData: any = { ...createActivityDto };
    if (files && files.length > 0) {
      activityData.imageUrl = files[0].filename;
      if (files.length > 1) {
        activityData.documentUrl = files[1].filename;
      }
    }
    return this.activitiesService.create(activityData, req.user);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Öğrencinin kendi faaliyetlerini listelemesi' })
  async getMyActivities(@Request() req) {
    return this.activitiesService.findByStudent(req.user.id);
  }

  @Get('my/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Öğrencinin kendi saat istatistikleri' })
  async getMyStats(@Request() req) {
    return this.activitiesService.getStatsByStudent(req.user.id);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Onay bekleyen faaliyetler (Öğretmen/Admin)' })
  async getPending() {
    return this.activitiesService.findAllPending();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Faaliyet durumunu güncelle (Onay/Red)' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateActivityStatusDto
  ) {
    return this.activitiesService.updateStatus(id, updateStatusDto.status, updateStatusDto.rejectionReason);
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
