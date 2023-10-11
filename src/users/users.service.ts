import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const result = await this.prismaService.user.create({
      data: createUserDto,
    });
    return result;
  }
  // async findAll(query: Prisma.UserInclude) {
  //   try {
  //     return await this.prismaService.user.findMany({ include: query });
  //   } catch (error) {
  //     throw new Error(`Unable to retrieve users: ${error.message}`);
  //   }
  // }

  async findAll(page?: number, perPage?: number) {
    try {
      const skip = (page - 1) * perPage;
      const take = +perPage;
      return await this.prismaService.user.findMany({
        skip: skip ? skip : undefined,
        take: take ? take : undefined,
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(`Unable to retrieve categories: ${error.message}`);
    }
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.user.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(
        `Unable to retrieve user with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        data: updateUserDto,
        where: { id },
      });
    } catch (error) {
      throw new Error(`Unable to update user with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      // return await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Unable to delete user with ID ${id}: ${error.message}`);
    }
  }
}
