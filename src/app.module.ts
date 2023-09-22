import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CategoriesModule, PrismaModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
