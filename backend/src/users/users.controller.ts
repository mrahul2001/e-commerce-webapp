import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomApiResponse } from '../utils/send-response';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddAddressDto } from './dto/add-shipping-address.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto)
    return new CustomApiResponse(201, 'User Created', createdUser)
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-address') 
  async addAdress(
    @Body() addAddressDto: AddAddressDto, 
    @Req() req: Request) {
      const addingAddres = await this.userService.addAddress(addAddressDto, req);
      return new CustomApiResponse(200, 'Address Added', addingAddres);
    }
}
