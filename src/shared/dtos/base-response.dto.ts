import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({ description: 'Status da resposta', example: 'success' })
  status: string;
  @ApiProperty({ description: 'Mensagem de resposta', example: 'Todo criado com sucesso!' })
  message: string;
  @ApiProperty({ description: 'Dados da resposta', nullable: true })
  data: T;
  constructor(status: string, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
