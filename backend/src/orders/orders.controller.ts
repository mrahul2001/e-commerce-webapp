import { Controller, Post, Body, UseGuards, Req, Param, Get } from '@nestjs/common';
import { Request } from 'express';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomApiResponse } from '../utils/send-response';
import { GetOrderDto } from './dto/get-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request) {
    const insertedProduct = await this.ordersService.insert(createOrderDto, req);

    return new CustomApiResponse(201, 'Order Created', insertedProduct)
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async getOrders (
    @Body() getOrderDto: GetOrderDto,
    @Req() req: Request
  ) {
    const fetchedOrders = await this.ordersService.getOrders(getOrderDto, req);

    return new CustomApiResponse(200, 'Orders Fetched', fetchedOrders)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:orderId')
  async getProductById(@Param('orderId') orderId: string) {
    const fetchedProduct = await this.ordersService.getOrderById(orderId);

    return new CustomApiResponse(200, 'Product Fetched', fetchedProduct);
  }
}
