import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { CustomApiResponse } from '../utils/send-response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async userLogin(@Body() loginUserDto: LoginUserDto) {
    try {

      const token = await this.authService.loginTokenGeneration(loginUserDto);
      return new CustomApiResponse(200, 'Logged in...', token);
    } catch (error) {
      throw new Error(error);
    }
  }
}
