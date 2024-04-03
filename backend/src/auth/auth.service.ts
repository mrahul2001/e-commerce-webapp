import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';

import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {

    const hashedPassword = md5(password);
    const user = await this.userRepository.findOne({ where: { email, password: hashedPassword } })

    if (!user) throw new UnauthorizedException('Not Authorized.');

    return user;
  }

  async loginTokenGeneration(loginUserDto: LoginUserDto) {
    try {

      const payload = { email: loginUserDto.email };
      const accessToken = this.jwtService.sign(payload);

      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  }
}
