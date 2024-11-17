import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'João da Silva' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: '' })
  @IsDefined()
  @IsEmail()
  @MinLength(3)
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}