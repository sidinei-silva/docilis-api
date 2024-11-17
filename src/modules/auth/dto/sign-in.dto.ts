import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'Email do usuário', example: 'user@example.com' })
  @IsDefined()
  @IsString()
  @IsEmail()
  @MinLength(3)
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: '123456' })
  @IsDefined()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}