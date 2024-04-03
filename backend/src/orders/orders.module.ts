import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { ShippingAddress } from '../users/entities/shipping-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, ShippingAddress])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
