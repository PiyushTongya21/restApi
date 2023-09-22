import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService){}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prismaService.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      throw new Error(`Unable to create category: ${error.message}`);
    }
  }

  async findAll(query: Prisma.CategoryInclude) {
    try {
      return await this.prismaService.category.findMany({ include: query });
    } catch (error) {
      throw new Error(`Unable to retrieve categories: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.category.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(
        `Unable to retrieve category with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prismaService.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new Error(
        `Unable to update category with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.category.delete({ where: { id } });
    } catch (error) {
      throw new Error(
        `Unable to delete category with ID ${id}: ${error.message}`,
      );
    }
  }
}
