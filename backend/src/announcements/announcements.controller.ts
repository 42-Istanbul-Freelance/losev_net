import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './announcement.dto';

@ApiTags('announcements')
@ApiBearerAuth()
@Controller('announcements')
export class AnnouncementsController {
  constructor(private announcementsService: AnnouncementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Duyuru oluştur (Admin/Öğretmen)' })
  async create(@Request() req, @Body() createDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Tüm duyuruları listele' })
  async findAll() {
    return this.announcementsService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Duyuru sil (Admin/Öğretmen)' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.announcementsService.delete(id);
    return { message: 'Duyuru silindi.' };
  }
}
