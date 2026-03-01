import { Controller, Get, Patch, Body, Param, UseGuards, Request, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserStatusDto } from './user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Kullanıcı profilini getir' })
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneById(req.user.id);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    const { password, ...result } = user;
    return result;
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Onay bekleyen kullanıcıları listele (Admin)' })
  async getPending() {
    return this.usersService.findAllPending();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Kullanıcı durumunu güncelle (Onay/Red)' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserStatusDto: UpdateUserStatusDto
  ) {
    return this.usersService.updateStatus(id, updateUserStatusDto.status, updateUserStatusDto.teacherId);
  }

  @Get('teachers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Tüm öğretmenleri listele (Admin)' })
  async getTeachers() {
    return this.usersService.findAllByRole(UserRole.TEACHER);
  }
}
