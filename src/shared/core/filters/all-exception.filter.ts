import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ValidationError } from 'class-validator';
import { createErrorResponse } from '../../utils/response.util';
import { ErrorMessages } from '../errors/messages.error';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode: number;
    let message: string;
    let errors: string[] = [];
    // Verificar se é uma exceção HTTP
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const httpResponse: any = exception.getResponse();
      // Se for erro de validação, capturar os detalhes dos erros
      if (httpResponse?.message && Array.isArray(httpResponse.message)) {
        errors = httpResponse.message;
        message = 'Erro de validação';
      } else {
        message = typeof httpResponse === 'string' ? httpResponse : httpResponse?.message || 'Erro interno do servidor';
        errors = [message];
      }
    } else if (exception instanceof ValidationError) {
      // Tratamento específico para erros do class-validator
      statusCode = HttpStatus.BAD_REQUEST;
      errors = Object.values(exception.constraints || {});
      message = 'Erro de validação';
    } else {
      // Outros tipos de erro (incluindo AxiosError ou erros inesperados)
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = (exception as any)?.message || 'Erro interno do servidor';
      errors = [ErrorMessages.commons.generic];
    }
    // Verificar se estamos no ambiente de desenvolvimento
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      console.error('Erro capturado:', exception);
    }
    // Tratamento de erros de Axios, caso sua aplicação faça requisições externas
    if (exception instanceof AxiosError) {
      console.error('Erro de Axios capturado:', {
        status: exception.response?.status,
        statusText: exception.response?.statusText,
        data: exception.response?.data,
      });
    }
    // Retornar uma resposta com o formato padronizado usando createErrorResponse
    response.status(statusCode).json(createErrorResponse(message, errors.length > 0 ? errors : null));
  }
}
