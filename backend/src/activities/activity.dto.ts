import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ActivityType, ActivityStatus } from './activity.entity';

export class CreateActivityDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tarih boş olamaz.' })
  date: string;

  @ApiProperty({ enum: ActivityType })
  @IsEnum(ActivityType, { message: 'Geçerli bir etkinlik türü seçiniz.' })
  type: ActivityType;

  @ApiProperty()
  @IsNumber({}, { message: 'Geçerli bir saat giriniz.' })
  @Min(0.5, { message: 'En az 0.5 saat girilmelidir.' })
  hours: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Açıklama boş olamaz.' })
  @IsString()
  description: string;
}

export class UpdateActivityStatusDto {
  @ApiProperty({ enum: ActivityStatus })
  @IsEnum(ActivityStatus, { message: 'Geçerli bir durum seçiniz.' })
  status: ActivityStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
