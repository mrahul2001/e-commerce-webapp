import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { Request } from 'express';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ShippingAddress } from './entities/shipping-address.entity';
import { AddAddressDto } from './dto/add-shipping-address.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ShippingAddress) private shippingAddressRepoitory: Repository<ShippingAddress>,
  ) { }

  hashing(toBeHashed: string) {
    const hashsedValue = md5(toBeHashed);
    return hashsedValue;
  }

  async create(createUserDto: CreateUserDto) {
    const hashsedPassword = this.hashing(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashsedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    const newShippingAddress = await this.shippingAddressRepoitory.create({
      ...createUserDto,
      userId: savedUser.id,
      shippingAddress: createUserDto.shippingAddress,
    })
    const savedAddress = await this.shippingAddressRepoitory.save(newShippingAddress);

    const { password, id, ...userDetails } = savedUser;
    const {userId, shippingId, ...shippingAddress} = savedAddress;

    return {
      ...userDetails,
      ...shippingAddress};
  }

  async addAddress(addAddressDto: AddAddressDto, req: Request) {
    const email = req['user']['email'];

    const loggedInUser = await this.userRepository.findOne({ where: { email } });

    const newAddress = await this.shippingAddressRepoitory.create({
      ...addAddressDto,
      userId: loggedInUser.id
    });

    await this.shippingAddressRepoitory.save(newAddress);

    const {userId, shippingId, ...address} = newAddress;


    return newAddress;
  }

  async findOne(email) {
    return this.userRepository.findOne({ where: { email } });
  }
}
