import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { IsEmail } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || user.password !== password) return false;
    return user;
  }

  sign(user: User) {
    const accessToken = this.jwtservice.sign({
      email: user.email,
      sub: user.id,
    });
    return {
      user_id: user.id,
      name: user.name,
      accessToken,
    };
  }
  async registerUser(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return this.sign(newUser);
  }
}
