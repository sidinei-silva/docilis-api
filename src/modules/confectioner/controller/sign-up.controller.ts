import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErrorMessages } from '../../../shared/core/errors/messages.error';
import { BaseResponse } from '../../../shared/dtos/base-response.dto';
import { createSuccessResponse } from '../../../shared/utils/response.util';
import { CreateConfectionerDto } from '../dto/create-confectioner.dto';
import { Confectioner } from '../model/confectioner.model';
import { SignUpUseCase } from '../usecases/sign-up.usecase';
import { ConfectionerResponse } from './confectioner.response';
import { Public } from '../../auth/decorators/public.decorator';

@ApiTags('sign-up')
@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new confectioner' })
  @ApiResponse({
    status: 201,
    description: 'Confectioner created successfully.',
    type: BaseResponse<Confectioner>,
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 409, description: ErrorMessages.confectioner.emailAlreadyExists })
  @ApiBody({ type: CreateConfectionerDto })
  async createConfectioner(@Body() createConfectionerDto: CreateConfectionerDto): Promise<BaseResponse<Confectioner>> {
    const confectioner = await this.signUpUseCase.execute(createConfectionerDto);
    return createSuccessResponse(confectioner, ConfectionerResponse.success.created.message);
  }
}
