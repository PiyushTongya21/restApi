import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Me } from '../auth/guards/me/me.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PostQueryDto } from './dto/query.dto';
import { isEmpty } from '../util/index';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Me() { id,email }, @Body() createPostDto: CreatePostDto) {
    const categories = createPostDto.categories?.map((category) => ({
      id: category,
    }));
    return this.postsService.create({
      ...createPostDto,
      user: { connect: { id } },
      categories: { connect: categories },
    });
  }

  // @Get()
  // findAll(@Query('userId') userId: string) {
  //   return this.postsService.findAll(isEmpty(userId) ? null : userId);
  // }
  @Get()
  findAll(@Query('page') page: number, @Query('perPage') perPage: number) {
    return this.postsService.findAll(page, perPage);
  }



  // @Get('search')
  // async search(@Query('keyword') keyword: string) {
  //   const results = await this.postsService.searchPosts(keyword);
  //   return results;
  // }


  // @Get()
  // async findAll(
  //   @Query('userId') userId: string,
  //   @Query('page') page: number,
  //   @Query('perPage') perPage: number,
  // ) {
  //   return this.postsService.findAll(userId, page, perPage);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories?.map((category) => ({
      id: category,
    }));
    return this.postsService.update(id, {
      ...updatePostDto,
      categories: { set: categories },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
