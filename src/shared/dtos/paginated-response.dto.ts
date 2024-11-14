import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './base-response.dto';

export class PaginatedResponse<T> extends BaseResponse<T[]> {
  @ApiProperty({ description: 'Número total de itens', example: 100 })
  totalCount: number;
  @ApiProperty({ description: 'Número da página atual', example: 1 })
  currentPage: number;
  @ApiProperty({ description: 'Quantidade de itens por página', example: 10 })
  itemsPerPage: number;
  @ApiProperty({ description: 'Dados paginados', isArray: true })
  data: T[];
}
