import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from './entities/user.entity';
import { ShippingAddress } from './entities/shipping-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ShippingAddress])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
