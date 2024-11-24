import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsDefined, IsEmail } from 'class-validator';

export class CreateConfectionerDto {
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

  @ApiProperty({ description: 'Senha do usuário', example: '' })
  @IsDefined()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
