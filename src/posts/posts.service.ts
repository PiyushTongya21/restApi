import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  async create(createPostDto: Prisma.PostCreateInput) {
    try {
      return await this.prismaService.post.create({
        data: createPostDto,
      });
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prismaService.post.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          title: true,
          body: true,
          user: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.post.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to fetch post with ID ${id}: ${error.message}`);
    }
  }

  async update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    try {
      return await this.prismaService.post.update({
        where: { id },
        data: updatePostDto,
      });
    } catch (error) {
      throw new Error(`Failed to update post with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.post.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to delete post with ID ${id}: ${error.message}`);
    }
  }
}
