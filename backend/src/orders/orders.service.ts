import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { ShippingAddress } from '../users/entities/shipping-address.entity';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ShippingAddress) private shippingAddressRepository: Repository<ShippingAddress>,
  ) { }

  async searchForProduct(productName) {
    return await this.productRepository.findOne({ where: { productName } });
  }

  async insert(createOrderDto: CreateOrderDto, req: Request) {

    const loggedInUser = await this.userRepository.findOne({ where: { email: req['user']['email'] } });

    const newOrder = this.orderRepository.create({
      ...createOrderDto,
      userId: loggedInUser.id,
      address: createOrderDto.shippingAddress
    })

    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  async getOrders(
    getOrderDto: GetOrderDto,
    req: Request
  ) {
    const loggedInUser = await this.userRepository.findOne({ where: { email: req['user']['email'] } });
    const queryBuilder = this.orderRepository
      .createQueryBuilder('orders')
      .select([
        'orderDetails',
        'createdAt',
        'address',
        'orderId',
        'totalAmount',
        'orderStatus',
        'paymentMethod'
      ])
      .orderBy('createdAt', 'DESC')

    Object.entries(getOrderDto).forEach(([key, value]) => {
      if (value !== undefined) {
        switch (key) {
          case 'orderId':
            queryBuilder.andWhere('orderId = :orderId', { orderId: value });
            break;
          case 'createdAt':
            queryBuilder.andWhere('createdAt <= :createdAt', { createdAt: value });
            break;
          case 'address':
            queryBuilder.andWhere('address = :address', { address: value });
            break;
        }
      }
    });
    return await queryBuilder
    .andWhere('userId = :userId', {userId: loggedInUser.id})
    .execute();
  }

  async getOrderById(orderId: string) {
    const fetchedOrder = await this.orderRepository
      .createQueryBuilder('orders')
      .where('orderId = :orderId', { orderId })
      .getOne();

      return fetchedOrder;
  }

}
