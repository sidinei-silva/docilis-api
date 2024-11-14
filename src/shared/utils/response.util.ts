import { BaseResponse } from '../dtos/base-response.dto';
import { PaginatedResponse } from '../dtos/paginated-response.dto';

export function createSuccessResponse<T>(data: T, message: string = 'Operação bem-sucedida'): BaseResponse<T> {
  return new BaseResponse('success', message, data);
}
export function createErrorResponse<T>(message: string, data: T | null = null): BaseResponse<T | null> {
  return new BaseResponse('error', message, data);
}
export function createPaginatedResponse<T>(
  data: T[],
  message: string = 'Operação bem-sucedida',
  totalCount: number,
  currentPage: number,
  itemsPerPage: number,
): PaginatedResponse<T> {
  return {
    status: 'success',
    message,
    data,
    totalCount,
    currentPage,
    itemsPerPage,
  };
}
