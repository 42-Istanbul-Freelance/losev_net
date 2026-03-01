import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEnum, MinLength, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../users/user.entity';

export class RegisterDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Şifre boş olamaz.' })
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır.' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Ad soyad boş olamaz.' })
  fullName: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole, { message: 'Geçerli bir rol seçiniz.' })
  role: UserRole;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tcNo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  schoolName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gsm?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coordinatorName?: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
