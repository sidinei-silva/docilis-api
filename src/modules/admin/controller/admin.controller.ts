import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminUseCase } from '../usecases/create-admin.usecase';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { ErrorMessages } from '../../../shared/core/errors/messages.error';
import { BaseResponse } from '../../../shared/dtos/base-response.dto';
import { createSuccessResponse } from '../../../shared/utils/response.util';
import { AdminJwtGuard } from '../../auth/guards/admin-jwt.guard';
import { Admin } from '../model/admin.model';
import { AdminResponse } from './admin.response';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly createAdminUseCase: CreateAdminUseCase) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({ status: 201, description: 'Admin created successfully.', type: BaseResponse<Admin> })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 409, description: ErrorMessages.admin.emailAlreadyExists })
  @ApiBody({ type: CreateAdminDto })
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<BaseResponse<Admin>> {
    const admin = await this.createAdminUseCase.execute(createAdminDto);
    return createSuccessResponse(admin, AdminResponse.success.created.message);
  }
}
