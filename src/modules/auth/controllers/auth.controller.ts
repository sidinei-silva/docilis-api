import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminSignUseCase } from '../usecases/admin-sign.usecase';
import { AuthModel } from '../model/auth.model';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { SignInDto } from '../dto/sign-in.dto';
import { AdminJwtGuard } from '../guards/admin-jwt.guard';
import { Authenticated } from '../decorators/authenticated.decorator';
import { BaseResponse } from '../../../shared/dtos/base-response.dto';
import { createSuccessResponse } from '../../../shared/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly adminSignInUseCase: AdminSignUseCase) {}

  @Public()
  @Post('admin/sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, description: 'Admin signed in successfully.', type: BaseResponse<AuthModel> })
  @ApiBody({ type: SignInDto })
  async signIn(@Body() signInDto: SignInDto): Promise<BaseResponse<AuthModel>> {
    const adminAuth = await this.adminSignInUseCase.execute(signInDto);
    return createSuccessResponse(adminAuth, 'Admin signed in successfully!');
  }

  @UseGuards(AdminJwtGuard)
  @Get('admin/me')
  @ApiOperation({ summary: 'Get admin profile' })
  @ApiResponse({ status: 200, description: 'Admin profile retrieved successfully.', type: BaseResponse<AuthModel> })
  async getMeAdmin(@Authenticated() authenticatedUser) {
    return createSuccessResponse(authenticatedUser, 'Admin profile retrieved successfully!');
  }
}
